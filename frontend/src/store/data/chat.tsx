import { create } from "zustand";
import { api } from "@/api";
import { connectSocket, joinConversation, getSocket } from "@/lib/socket";

export interface Participant {
  id: number;
  name: string;
  email: string;
}

export interface ConversationItem {
  id: number;
  item_group_id: string;
  type: "private" | "group";
  is_closed: boolean;
  created_at: string;
  closed_at: string | null;
  item: {
    title: string;
    group_id: string;
    source: string;
    slug: string;
    user_id: number;
  } | null;
  participants: Participant[];
  lastMessage: MessageData | null;
  is_uploader: boolean;
}

export interface MessageData {
  id: number;
  conversation_id: number;
  sender_id: number;
  content: string;
  created_at: string;
  sender?: Participant;
}

interface ChatState {
  isOpen: boolean;
  conversations: ConversationItem[];
  activeConversationId: number | null;
  messages: Record<number, MessageData[]>;
  loading: boolean;
  messagesLoading: boolean;

  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  fetchConversations: () => Promise<void>;
  setActiveConversation: (id: number) => Promise<void>;
  clearActiveConversation: () => void;
  sendMessage: (conversationId: number, content: string) => Promise<void>;
  claimItem: (itemGroupId: string, type: "private" | "group") => Promise<ConversationItem>;
  closeConversation: (conversationId: number) => Promise<void>;
  startPrivateConversation: (conversationId: number, userId: number) => Promise<void>;
  addMessage: (message: MessageData) => void;
  markConversationClosed: (conversationId: number) => void;
}

export const useChat = create<ChatState>((set, get) => ({
  isOpen: false,
  conversations: [],
  activeConversationId: null,
  messages: {},
  loading: false,
  messagesLoading: false,

  toggleChat: () => {
    const next = !get().isOpen;
    set({ isOpen: next });
    if (next) {
      connectSocket();
      get().fetchConversations();
    }
  },

  openChat: () => {
    set({ isOpen: true });
    connectSocket();
    get().fetchConversations();
  },

  closeChat: () => {
    set({ isOpen: false });
  },

  fetchConversations: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get("/chat/conversations");
      set({ conversations: data.data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  setActiveConversation: async (id: number) => {
    set({ activeConversationId: id, messagesLoading: true });
    await joinConversation(id);

    try {
      const { data } = await api.get(`/chat/conversations/${id}/messages`);
      set((state) => ({
        messages: { ...state.messages, [id]: data.data },
        messagesLoading: false,
      }));
    } catch {
      set({ messagesLoading: false });
    }
  },

  clearActiveConversation: () => {
    set({ activeConversationId: null });
  },

  sendMessage: async (conversationId: number, content: string) => {
    try {
      const { data } = await api.post(`/chat/conversations/${conversationId}/messages`, { content });
      const msg = data.data;
      set((state) => {
        const existing = state.messages[conversationId] || [];
        if (existing.some((m) => m.id === msg.id)) return state;
        return {
          messages: {
            ...state.messages,
            [conversationId]: [...existing, msg],
          },
        };
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  },

  claimItem: async (itemGroupId: string, type: "private" | "group") => {
    const { data } = await api.post("/chat/claim", { item_group_id: itemGroupId, type });
    const conversation = data.data.conversation;

    set((state) => {
      const exists = state.conversations.find((c) => c.id === conversation.id);
      if (exists) {
        return {
          conversations: state.conversations.map((c) =>
            c.id === conversation.id ? { ...c, ...conversation } : c,
          ),
        };
      }
      return { conversations: [conversation, ...state.conversations] };
    });

    return conversation;
  },

  closeConversation: async (conversationId: number) => {
    await api.post(`/chat/conversations/${conversationId}/close`);
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, is_closed: true } : c,
      ),
    }));
  },

  startPrivateConversation: async (conversationId: number, userId: number) => {
    const { data } = await api.post(`/chat/conversations/${conversationId}/private`, {
      user_id: userId,
    });
    const newConv = data.data;

    set((state) => {
      const exists = state.conversations.find((c) => c.id === newConv.id);
      if (exists) return state;
      return { conversations: [newConv, ...state.conversations] };
    });

    return newConv;
  },

  addMessage: (message: MessageData) => {
    set((state) => {
      const existing = state.messages[message.conversation_id] || [];
      if (existing.some((m) => m.id === message.id)) return state;

      return {
        messages: {
          ...state.messages,
          [message.conversation_id]: [...existing, message],
        },
        conversations: state.conversations
          .map((c) =>
            c.id === message.conversation_id ? { ...c, lastMessage: message } : c,
          )
          .sort((a, b) => {
            const aTime = a.lastMessage
              ? new Date(a.lastMessage.created_at).getTime()
              : new Date(a.created_at).getTime();
            const bTime = b.lastMessage
              ? new Date(b.lastMessage.created_at).getTime()
              : new Date(b.created_at).getTime();
            return bTime - aTime;
          }),
      };
    });
  },

  markConversationClosed: (conversationId: number) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, is_closed: true } : c,
      ),
    }));
  },
}));
