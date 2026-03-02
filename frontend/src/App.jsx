import {Routes,Route} from 'react-router'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import { useAuthStore } from './stores/useAuthStore'

function App() {
  const {isLoggedIn} = useAuthStore()

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - NEW STYLE: overlapping translucent circles */}
      <div className="absolute inset-0 bg-linear-to-tr from-indigo-500 to-purple-600 opacity-50" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full opacity-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400 rounded-full opacity-15 blur-xl" />
      <Routes>
        <Route path='/' element={<ChatPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default App