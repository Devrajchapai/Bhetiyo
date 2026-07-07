import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/store/data/auth";
import { useChat, ConversationItem, MessageData } from "@/store/data/chat";
import { getSocket } from "@/lib/socket";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCheck,
  Send,
  User,
  MessageSquareOff,
  Loader2,
  Lock,
  MessageCircle,
} from "lucide-react";

interface Props {
  conversation: ConversationItem;
  onBack: () => void;
}

export const ChatConversation = ({ conversation, onBack }: Props) => {
  const {
    messages,
    messagesLoading,
    sendMessage,
    closeConversation,
    startPrivateConversation,
    setActiveConversation,
  } = useChat();
  const currentUser = useAuth((state) => state.id);
  const currentEmail = useAuth((state) => state.email);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);

  const isClosed = conversation.is_closed;
  const isUploader = conversation.is_uploader;
  const conversationMessages = messages[conversation.id] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversationMessages.length]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMessage = (msg: MessageData) => {
      if (msg.conversation_id === conversation.id) {
        useChat.getState().addMessage(msg);
      }
    };

    const handleConversationClosed = (data: { conversation_id: number }) => {
      if (data.conversation_id === conversation.id) {
        useChat.getState().markConversationClosed(conversation.id);
      }
    };

    socket.on("message:new", handleNewMessage);
    socket.on("conversation:closed", handleConversationClosed);

    return () => {
      socket.off("message:new", handleNewMessage);
      socket.off("conversation:closed", handleConversationClosed);
    };
  }, [conversation.id]);

  const handleSend = async () => {
    if (!newMessage.trim() || isClosed) return;
    const content = newMessage.trim();
    setNewMessage("");
    await sendMessage(conversation.id, content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClose = async () => {
    setClosing(true);
    try {
      await closeConversation(conversation.id);
      toast.success("Item marked as returned. Conversation closed.");
    } catch {
      toast.error("Failed to close conversation");
    } finally {
      setClosing(false);
    }
  };

  const handleStartPrivate = async (userId: number, userName: string) => {
    try {
      const newConv = await startPrivateConversation(conversation.id, userId);
      setActiveConversation(newConv.id);
      toast.success(`Private chat started with ${userName}`);
    } catch {
      toast.error("Failed to start private conversation");
    }
  };

  const participants = conversation.participants || [];
  const otherParticipants = participants.filter((p) => p.id !== currentUser);
  const headerName =
    conversation.type === "group"
      ? conversation.item?.title || "Group Chat"
      : otherParticipants.map((p) => p.name).join(", ") || "Chat";

  return (
    <div className="flex flex-col h-full" style={{ height: "100%" }}>
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white shrink-0">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 text-sm truncate">
            {headerName}
          </p>
          <p className="text-xs text-slate-400 truncate">
            {conversation.type === "group"
              ? `${participants.length} members`
              : `Private`}
            {conversation.item?.title && conversation.type === "private" && (
              <> · {conversation.item.title}</>
            )}
          </p>
        </div>
        {isUploader && !isClosed && (
          <button
            onClick={handleClose}
            disabled={closing}
            className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
            title="Close - item returned"
          >
            {closing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
          </button>
        )}
        {isClosed && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-medium flex items-center gap-1.5">
            <Lock className="w-3 h-3" /> Closed
          </span>
        )}
      </div>

      {conversation.type === "group" && !isClosed && isUploader && (
        <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/80">
          <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
            Participants
          </p>
          <div className="flex flex-wrap gap-2">
            {otherParticipants.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs"
              >
                <User className="w-3 h-3 text-slate-400" />
                <span className="text-slate-700 font-medium">{p.name}</span>
                <button
                  onClick={() => handleStartPrivate(p.id, p.name)}
                  className="ml-1 p-0.5 rounded hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                  title={`Private chat with ${p.name}`}
                >
                  <MessageCircle className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50 min-h-0">
        {messagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-7 h-7 text-blue-500 animate-spin" />
          </div>
        ) : conversationMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
            <MessageSquareOff className="w-10 h-10" />
            <p className="text-sm">No messages yet</p>
          </div>
        ) : (
          conversationMessages.map((msg) => {
            const isMine = msg.sender_id === currentUser || msg.sender?.email === currentEmail;
            return (
              <div
                key={msg.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    isMine
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white text-slate-800 rounded-bl-md shadow-sm border border-slate-100"
                  }`}
                >
                  {!isMine && conversation.type === "group" && msg.sender && (
                    <p className="text-xs font-semibold text-blue-600 mb-1">
                      {msg.sender.name}
                    </p>
                  )}
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                  <div
                    className={`flex items-center gap-1 mt-1 ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span
                      className={`text-[10px] ${
                        isMine ? "text-blue-200" : "text-slate-400"
                      }`}
                    >
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {isMine && <CheckCheck className="w-3 h-3 text-blue-200" />}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-slate-200 bg-white p-3 shrink-0">
        {isClosed ? (
          <div className="text-center text-sm text-slate-400 py-2 flex items-center justify-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            This conversation has been closed
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-full bg-slate-100 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 border border-slate-200"
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
