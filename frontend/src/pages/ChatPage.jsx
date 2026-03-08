import { useChatStore } from '../stores/useChatStore.js'

import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="chat-page">
      {/* Ambient blobs — matches signup/login theme */}
      <div className="signup-blob signup-blob--1" />
      <div className="signup-blob signup-blob--2" />

      <div className="chat-layout">
        {/* LEFT SIDEBAR */}
        <div className="chat-sidebar">
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="chat-sidebar__list">
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT MAIN PANEL */}
        <div className="chat-main">
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>
      </div>
    </div>
  );
}
export default ChatPage;