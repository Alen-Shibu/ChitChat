import { XIcon } from "lucide-react";
import { useChatStore } from "../stores/useChatStore";
import { useEffect } from "react";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="chat-header">
      <div className="chat-header__user">
        <div className="avatar online">
          <div className="chat-header__avatar">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>
        <div>
          <h3 className="chat-header__name">{selectedUser.fullName}</h3>
          <span className="chat-header__status">
            <span className="chat-header__status-dot" />
            Online
          </span>
        </div>
      </div>

      <button className="chat-header__close" onClick={() => setSelectedUser(null)}>
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
}
export default ChatHeader;