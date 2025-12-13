import "./App.css"
import { signOut } from "firebase/auth"
import { auth } from "./lib/firebase/config"

export default function AppContent() {
  const handleSignOut = async () => {
    await signOut(auth)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World</h1>
        <p>You are logged in!</p>
        <button onClick={handleSignOut}>Sign out</button>
      </header>
    </div>
  )
}
