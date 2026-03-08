function UsersLoadingSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="chat-user-item animate-pulse" style={{ pointerEvents: "none" }}>
          <div className="chat-skeleton-avatar" />
          <div className="chat-skeleton-lines">
            <div className="chat-skeleton-line chat-skeleton-line--long" />
            <div className="chat-skeleton-line chat-skeleton-line--short" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default UsersLoadingSkeleton;