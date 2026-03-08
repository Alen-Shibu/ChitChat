import { useChatStore } from "../stores/useChatStore.js";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="chat-tabs">
      <button
        onClick={() => setActiveTab("chats")}
        className={`chat-tabs__btn ${activeTab === "chats" ? "chat-tabs__btn--active" : ""}`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`chat-tabs__btn ${activeTab === "contacts" ? "chat-tabs__btn--active" : ""}`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;