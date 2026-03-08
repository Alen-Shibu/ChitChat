import { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore.js";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactList() {
  const { getAllContacts, allContacts, setSelectedUser, isUsersLoading } = useChatStore();

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
          {/* TODO: MAKE IT WORK WITH SOCKET */}
          <div className="avatar online">
            <div className="chat-user-item__avatar">
              <img src={contact.profilePic || "/avatar.png"} />
            </div>
          </div>
          <div className="chat-user-item__info">
            <h4 className="chat-user-item__name">{contact.fullName}</h4>
            <span className="chat-user-item__sub">Available</span>
          </div>
        </div>
      ))}
    </>
  );
}
export default ContactList;