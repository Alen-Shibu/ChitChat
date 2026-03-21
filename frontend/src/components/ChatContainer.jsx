import { useEffect, useRef } from "react";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useChatStore } from "../stores/useChatStore.js";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer({ onToggleSidebar }) {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading,subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages()

    return () => unsubscribeFromMessages()
  }, [selectedUser, getMessagesByUserId,subscribeToMessages,unsubscribeFromMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <ChatHeader onToggleSidebar={onToggleSidebar} />
      <div className="chat-messages">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="chat-messages__inner">
            {messages.map((msg) => {
              const isMe = msg.senderId === authUser._id;
              return (
                <div
                  key={msg._id}
                  className={`chat-bubble-row ${isMe ? "chat-bubble-row--me" : "chat-bubble-row--them"}`}
                >
                  <div className={`chat-bubble ${isMe ? "chat-bubble--me" : "chat-bubble--them"}`}>
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="chat-bubble__image"
                      />
                    )}
                    {msg.text && <p className="chat-bubble__text">{msg.text}</p>}
                    <p className="chat-bubble__time">
                      {new Date(msg.createdAt).toISOString().slice(11, 16)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
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