import { useAuthStore } from "../stores/useAuthStore"

function ChatPage() {
  const {logout} = useAuthStore()
  return (
    <div>
      <button onClick={logout} className="text-8xl text-blue-600">Logout</button>
    </div>
  )
}

export default ChatPage