import { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore.js";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../stores/useAuthStore.js";

function ChatsList({ onToggleSidebar }) {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const {onlineUsers} = useAuthStore()

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  const handleUserSelect = (chat) => {
    setSelectedUser(chat);
    // Close sidebar on mobile when user is selected
    if (window.innerWidth <= 768 && onToggleSidebar) {
      onToggleSidebar();
    }
  };

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="chat-user-item"
          onClick={() => handleUserSelect(chat)}
        >
          <div className="chat-user-item__avatar">
            <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
            <span className={`status-dot ${onlineUsers.includes(chat._id) ? "online" : "offline"}`} />
          </div>
          <div className="chat-user-item__info">
            <h4 className="chat-user-item__name">{chat.fullName}</h4>
            <span className="chat-user-item__sub">Tap to chat</span>
          </div>
        </div>
      ))}
    </>
  );
}
export default ChatsList;