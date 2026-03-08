import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../stores/useChatStore.js";

function NoChatsFound() {
  const { setActiveTab } = useChatStore();

  return (
    <div className="chat-placeholder">
      <div className="chat-placeholder__icon">
        <MessageCircleIcon className="w-7 h-7" />
      </div>
      <h4 className="chat-placeholder__title">No conversations yet</h4>
      <p className="chat-placeholder__sub">
        Start a new chat by selecting a contact from the contacts tab.
      </p>
      <button
        onClick={() => setActiveTab("contacts")}
        className="chat-chip"
      >
        Find contacts
      </button>
    </div>
  );
}
export default NoChatsFound;