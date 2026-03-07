import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useChatStore } from "../stores/useChatStore.js";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
  }, [selectedUser, getMessagesByUserId]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
  const isMe = msg.senderId === authUser._id;

  return (
    <div
      key={msg._id}
      className={`flex w-full mb-4 ${isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl border shadow-sm ${
          isMe
            ? "bg-cyan-600 text-white border-cyan-500"
            : "bg-slate-800 text-slate-200 border-slate-700"
        }`}
      >
        {msg.image && (
          <img
            src={msg.image}
            alt="Shared"
            className="rounded-lg mb-2 max-h-60 object-cover"
          />
        )}

        {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}

        <p className="text-[11px] mt-2 opacity-70 text-right">
          {new Date(msg.createdAt).toISOString().slice(11, 16)}
        </p>
      </div>
    </div>
  );
})}
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;