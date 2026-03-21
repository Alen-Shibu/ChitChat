import { XIcon, MenuIcon } from "lucide-react";
import { useChatStore } from "../stores/useChatStore";
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

function ChatHeader({ onToggleSidebar }) {
  const { selectedUser, setSelectedUser } = useChatStore();
  const {onlineUsers} = useAuthStore()

  useEffect(() => {
    const handleEscKey = (event) => {
    if(event.key === "Escape") setSelectedUser(null)
    };
    window.addEventListener("keydown",handleEscKey)
    return () => window.removeEventListener("keydown",handleEscKey)
  }, [setSelectedUser]);

  return (
    <div className="chat-header">
      <div className="chat-header__user">
        <div className={''}>
          <div className="chat-header__avatar">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>
        <div>
          <h3 className="chat-header__name">{selectedUser.fullName}</h3>
          <span className="chat-header__status">
            <span className={`chat-header__status-dot ${onlineUsers.includes(selectedUser?._id) ? "online" : "offline"}`} />
            {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="chat-header__menu md:hidden" onClick={onToggleSidebar}>
          <MenuIcon className="w-4 h-4" />
        </button>
        <button className="chat-header__close" onClick={() => setSelectedUser(null)}>
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
export default ChatHeader;