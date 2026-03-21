import { useState } from 'react';
import { useChatStore } from '../stores/useChatStore.js'
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="chat-page">
      {/* Ambient blobs — matches signup/login theme */}
      <div className="signup-blob signup-blob--1" />
      <div className="signup-blob signup-blob--2" />

      <div className="chat-layout">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* LEFT SIDEBAR */}
        <div className={`chat-sidebar ${isSidebarOpen ? 'chat-sidebar--open' : ''}`}>
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="chat-sidebar__list">
            {activeTab === "chats" ? <ChatsList onToggleSidebar={toggleSidebar} /> : <ContactList onToggleSidebar={toggleSidebar} />}
          </div>
        </div>

        {/* RIGHT MAIN PANEL */}
        <div className="chat-main">
          {selectedUser ? <ChatContainer onToggleSidebar={toggleSidebar} /> : <NoConversationPlaceholder onToggleSidebar={toggleSidebar} />}
        </div>
      </div>
    </div>
  );
}
    
export default ChatPage;