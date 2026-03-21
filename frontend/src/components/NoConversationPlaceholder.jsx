import { MessageCircleIcon, MenuIcon } from "lucide-react";

const NoConversationPlaceholder = ({ onToggleSidebar }) => {
  return (
    <div className="chat-placeholder chat-placeholder--full">
      <div className="flex justify-between items-center w-full px-6 py-3 border-b border-white/6 md:hidden">
        <h3 className="text-sm font-semibold text-white/90">ChitChat</h3>
        <button className="chat-header__menu" onClick={onToggleSidebar}>
          <MenuIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="chat-placeholder__icon chat-placeholder__icon--lg">
          <MessageCircleIcon className="w-10 h-10" />
        </div>
        <h3 className="chat-placeholder__title">Select a conversation</h3>
        <p className="chat-placeholder__sub">
          Choose a contact from the sidebar to start chatting or continue a previous conversation.
        </p>
      </div>
    </div>
  );
};

export default NoConversationPlaceholder;