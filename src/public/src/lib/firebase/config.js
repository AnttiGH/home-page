
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration (provided)
const firebaseConfig = {
  apiKey: "AIzaSyDleRGGW66FFzE_w5uZ9QJQZOZcB09Zpxs",
  authDomain: "positive-tracer.firebaseapp.com",
  projectId: "positive-tracer",
  storageBucket: "positive-tracer.firebasestorage.app",
  messagingSenderId: "263176121218",
  appId: "1:263176121218:web:afeec08f9aea555681fd9b",
  measurementId: "G-FC3YM28MSQ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// Initialize Analytics (browser only)
let analytics
try {
  analytics = getAnalytics(app)
} catch (e) {
  // getAnalytics may throw when run in non-browser environments
  // or if cookies/consent prevent initial´´ization. Silently ignore.
  analytics = undefined
}

const auth = getAuth(app)

export { app, analytics, auth }
