import { MessageCircleIcon } from "lucide-react";

const NoConversationPlaceholder = () => {
  return (
    <div className="chat-placeholder chat-placeholder--full">
      <div className="chat-placeholder__icon chat-placeholder__icon--lg">
        <MessageCircleIcon className="w-10 h-10" />
      </div>
      <h3 className="chat-placeholder__title">Select a conversation</h3>
      <p className="chat-placeholder__sub">
        Choose a contact from the sidebar to start chatting or continue a previous conversation.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;