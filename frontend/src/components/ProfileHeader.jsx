import { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useChatStore } from "../stores/useChatStore.js";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const { logout, authUser, updateProfile } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="profile-header">
      <div className="profile-header__left">
        {/* Avatar */}
        <div className="avatar online">
          <button
            className="profile-header__avatar"
            onClick={() => fileInputRef.current.click()}
          >
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="User image"
              className="w-full h-full object-cover"
            />
            <div className="profile-header__avatar-overlay">
              <span>Edit</span>
            </div>
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Name + status */}
        <div>
          <h3 className="profile-header__name">{authUser.fullName}</h3>
          <span className="profile-header__status">
            <span className="chat-header__status-dot" />
            Online
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="profile-header__actions">
        <button
          className="profile-header__btn"
          onClick={() => {
            mouseClickSound.currentTime = 0;
            mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
            toggleSound();
          }}
          title={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {isSoundEnabled ? (
            <Volume2Icon className="w-4 h-4" />
          ) : (
            <VolumeOffIcon className="w-4 h-4" />
          )}
        </button>

        <button
          className="profile-header__btn profile-header__btn--logout"
          onClick={logout}
          title="Log out"
        >
          <LogOutIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
export default ProfileHeader;