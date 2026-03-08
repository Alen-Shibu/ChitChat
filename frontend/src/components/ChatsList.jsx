import { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore.js";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="chat-user-item"
          onClick={() => setSelectedUser(chat)}
        >
          {/* TODO: FIX THIS ONLINE STATUS AND MAKE IT WORK WITH SOCKET */}
          <div className="avatar online">
            <div className="chat-user-item__avatar">
              <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
            </div>
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