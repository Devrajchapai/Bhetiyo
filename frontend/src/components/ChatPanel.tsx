import { useEffect, useState } from "react";
import { useAuth } from "@/store/data/auth";
import { useChat, ConversationItem } from "@/store/data/chat";
import { getSocket, connectSocket } from "@/lib/socket";
import { ChatConversation } from "./ChatConversation";
import { toast } from "sonner";
import {
  MessageCircle,
  X,
  Loader2,
  User,
  MessageSquareOff,
  CheckCheck,
  Lock,
} from "lucide-react";

export const ChatPanel = () => {
  const {
    isOpen,
    toggleChat,
    conversations,
    loading,
    fetchConversations,
    activeConversationId,
    setActiveConversation,
  } = useChat();
  const isConnected = useAuth((state) => state.isConnected);
  const token = useAuth((state) => state.token);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId,
  );

  useEffect(() => {
    if (!isConnected || !token) return;
    connectSocket().catch(() => {});
  }, [isConnected, token]);

  useEffect(() => {
    if (!isOpen || !isConnected) return;
    fetchConversations();
  }, [isOpen]);

  useEffect(() => {
    if (!isConnected) return;
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (msg: any) => {
      useChat.getState().addMessage(msg);
    };

    const handleClosed = () => {
      fetchConversations();
    };

    socket.on("message:new", handleNewMessage);
    socket.on("conversation:closed", handleClosed);

    return () => {
      socket.off("message:new", handleNewMessage);
      socket.off("conversation:closed", handleClosed);
    };
  }, [isConnected, isOpen]);

  const handleBack = () => {
    useChat.getState().clearActiveConversation();
  };

  if (!isConnected) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:bg-transparent md:pointer-events-none"
          onClick={() => {
            if (window.innerWidth < 768) useChat.getState().closeChat();
          }}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isOpen && (
          <div className="w-[380px] h-[560px] md:w-[420px] md:h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
            {activeConversation ? (
              <ChatConversation
                conversation={activeConversation}
                onBack={handleBack}
              />
            ) : (
              <>
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-white shrink-0">
                  <h2 className="text-lg font-bold text-slate-800">Messages</h2>
                  <button
                    onClick={() => useChat.getState().closeChat()}
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 px-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <MessageSquareOff className="w-8 h-8 text-blue-400" />
                      </div>
                      <p className="text-base font-semibold text-slate-700">
                        No conversations yet
                      </p>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Click <strong>"Found this?"</strong> on a lost item or{" "}
                        <strong>"That's mine!"</strong> on a found item to
                        start a conversation
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {conversations.map((conv) => (
                        <ConversationListItem
                          key={conv.id}
                          conversation={conv}
                          onClick={() => {
                            setActiveConversation(conv.id);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        <button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center relative"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
};

const ConversationListItem = ({
  conversation,
  onClick,
}: {
  conversation: ConversationItem;
  onClick: () => void;
}) => {
  const currentUserId = useAuth((state) => state.id);

  const otherParticipants = conversation.participants?.filter(
    (p) => p.id !== currentUserId,
  ) || [];

  const displayName =
    conversation.type === "group"
      ? conversation.item?.title || "Group Chat"
      : otherParticipants.map((p) => p.name).join(", ") || "Unknown";

  const initial = displayName.charAt(0).toUpperCase();
  const [resolving, setResolving] = useState(false);

  const handleResolve = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setResolving(true);
    try {
      await useChat.getState().closeConversation(conversation.id);
      toast.success("Conversation closed");
    } catch {
      toast.error("Failed to close conversation");
    } finally {
      setResolving(false);
    }
  };

  return (
    <div className="flex items-center px-5 py-3.5 hover:bg-slate-50 transition-colors group">
      <button
        onClick={onClick}
        className="flex-1 flex items-center gap-3 text-left min-w-0"
      >
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
          {conversation.type === "group" ? (
            <span className="text-xs">G</span>
          ) : (
            initial
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-semibold text-slate-800 truncate shrink min-w-0">
              {displayName}
            </h4>
            {conversation.item?.title && conversation.type === "private" && (
              <span className="text-[11px] text-slate-400 truncate shrink min-w-0">
                · {conversation.item.title}
              </span>
            )}
            <span className="ml-auto shrink-0">
              {conversation.lastMessage && (
                <span className="text-[10px] text-slate-400">
                  {new Date(conversation.lastMessage.created_at).toLocaleTimeString(
                    [],
                    { hour: "2-digit", minute: "2-digit" },
                  )}
                </span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            {conversation.is_closed ? (
              <Lock className="w-3 h-3 text-slate-300 shrink-0" />
            ) : conversation.type === "group" ? (
              <User className="w-3 h-3 text-slate-300 shrink-0" />
            ) : (
              <CheckCheck className="w-3 h-3 text-slate-300 shrink-0" />
            )}
            <p className="text-xs text-slate-500 truncate">
              {conversation.lastMessage?.content ||
                (conversation.is_closed ? "Closed" : "No messages yet")}
            </p>
          </div>
        </div>
      </button>
      {conversation.is_uploader && !conversation.is_closed && (
        <button
          onClick={handleResolve}
          disabled={resolving}
          className="ml-3 shrink-0 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 disabled:opacity-50"
        >
          {resolving ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            "Resolve"
          )}
        </button>
      )}
    </div>
  );
};
