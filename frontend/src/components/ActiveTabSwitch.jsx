import { useChatStore } from "../stores/useChatStore.js";

function ActiveTabSwitch() {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="flex bg-slate-700/30 rounded-lg p-1 mx-4 mb-2 border border-slate-600/50">
      <button
        onClick={() => setActiveTab("chats")}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
          activeTab === "chats"
            ? "bg-cyan-500/20 text-cyan-400 shadow-sm border border-cyan-500/30"
            : "text-slate-400 hover:text-slate-300 hover:bg-slate-600/30"
        }`}
      >
        Chats
      </button>

      <button
        onClick={() => setActiveTab("contacts")}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
          activeTab === "contacts"
            ? "bg-cyan-500/20 text-cyan-400 shadow-sm border border-cyan-500/30"
            : "text-slate-400 hover:text-slate-300 hover:bg-slate-600/30"
        }`}
      >
        Contacts
      </button>
    </div>
  );
}

export default ActiveTabSwitch;