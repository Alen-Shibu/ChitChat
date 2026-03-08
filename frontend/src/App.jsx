import {Routes,Route, Navigate} from 'react-router'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ChatPage from './pages/ChatPage'
import { useAuthStore } from './stores/useAuthStore.js'
import { useEffect } from 'react'
import PageLoader from './components/PageLoader.jsx'
import { Toaster } from "react-hot-toast";

function App() {
  const {checkAuth,isCheckingAuth,authUser} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  if(isCheckingAuth) return <PageLoader />

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - NEW STYLE: overlapping translucent circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full opacity-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400 rounded-full opacity-15 blur-xl" />\
      <div className="relative z-10">
      <Routes>
        <Route path='/' element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
        <Route path='/signup' element={!authUser ? <SignupPage /> : <Navigate to={"/"} />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
      </Routes>
      </div>

      <Toaster/>
    </div>
  )
}

export default App