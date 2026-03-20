import { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore.js";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../stores/useAuthStore.js";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();
  const {onlineUsers} = useAuthStore()

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="chat-user-item"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="chat-user-item__avatar">
            <img src={contact.profilePic || "/avatar.png"} />
            <span className={`status-dot ${onlineUsers.includes(contact._id) ? "online" : "offline"}`} />
          </div>
          <div className="chat-user-item__info">
            <h4 className="chat-user-item__name">{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;