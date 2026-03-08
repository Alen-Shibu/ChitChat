import { MessageCircleIcon } from "lucide-react";

const NoChatHistoryPlaceholder = ({ name }) => {
  return (
    <div className="chat-placeholder">
      <div className="chat-placeholder__icon">
        <MessageCircleIcon className="w-7 h-7" />
      </div>
      <h3 className="chat-placeholder__title">Start chatting with {name}</h3>
      <p className="chat-placeholder__sub">
        This is the beginning of your conversation. Say something!
      </p>
      <div className="chat-placeholder__chips">
        <button className="chat-chip">👋 Say Hello</button>
        <button className="chat-chip">🤝 How are you?</button>
        <button className="chat-chip">📅 Meet up soon?</button>
      </div>
    </div>
  );
};

export default NoChatHistoryPlaceholder;