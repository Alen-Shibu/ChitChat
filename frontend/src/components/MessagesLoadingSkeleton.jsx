function MessagesLoadingSkeleton() {
  return (
    <div className="chat-messages__inner">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`chat-bubble-row ${index % 2 === 0 ? "chat-bubble-row--them" : "chat-bubble-row--me"}`}
        >
          <div className="chat-skeleton-bubble animate-pulse" />
        </div>
      ))}
    </div>
  );
}
export default MessagesLoadingSkeleton;