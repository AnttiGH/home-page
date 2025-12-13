const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const admin = require('firebase-admin')

// Initialize Firebase Admin SDK if credentials are provided.
// Preferred approaches:
// - Set GOOGLE_APPLICATION_CREDENTIALS to a service account JSON file path
// - Or set FIREBASE_ADMIN_CREDENTIAL to the JSON string of the service account
if (process.env.FIREBASE_ADMIN_CREDENTIAL) {
  try {
    const cred = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL)
    admin.initializeApp({ credential: admin.credential.cert(cred) })
    console.log('Firebase Admin initialized from FIREBASE_ADMIN_CREDENTIAL')
  } catch (e) {
    console.error('Failed to initialize Firebase Admin from FIREBASE_ADMIN_CREDENTIAL', e)
  }
} else {
  try {
    admin.initializeApp()
    console.log('Firebase Admin initialized using default application credentials')
  } catch (e) {
    // If no credentials are available (e.g. local dev without env set), continue without admin.
    console.log('Firebase Admin not initialized (no credentials found)')
  }
}

// Middleware to verify Firebase ID tokens (passed in Authorization: Bearer <token>)
async function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization || ''
  console.info('[auth] checkAuth called', { method: req.method, path: req.path, hasAuth: !!authHeader })

  if (!authHeader.startsWith('Bearer ')) {
    console.warn('[auth] Missing or malformed Bearer token')
    return res.status(401).json({ error: 'Unauthorized - no Bearer token' })
  }

  const idToken = authHeader.split(' ')[1]
  console.info('[auth] Token received, length:', idToken.length)

  // Check if admin SDK was initialized
  if (!admin.apps.length) {
    console.error('[auth] Firebase Admin SDK not initialized - cannot verify token')
    return res.status(500).json({ error: 'Server misconfiguration - auth not available' })
  }

  try {
    const decoded = await admin.auth().verifyIdToken(idToken)
    console.info('[auth] Token verified successfully', { uid: decoded.uid, email: decoded.email })
    req.user = decoded
    return next()
  } catch (err) {
    console.error('[auth] Token verification failed:', err.code, err.message)
    return res.status(401).json({ error: 'Unauthorized - token invalid', details: err.code })
  }
}
const PORT = process.env.PORT || 8080;

const BUNDLE_DIR = path.join(__dirname, '..', 'bundle');

app.get('/ping', (req, res) => {
  console.info('[ping] Received ping request at', new Date().toISOString());
  res.json({ pong: true, time: new Date().toISOString() });
});

// Protected hello endpoint: returns hello world only for authenticated users
app.get('/hello', checkAuth, (req, res) => {
  // Log access for hot-reload testing and visibility
  console.info('[hello] Accessed /hello', { uid: req.user?.uid, time: new Date().toISOString() })
  res.json({ message: 'hello world', uid: req.user?.uid })
})

if (fs.existsSync(BUNDLE_DIR)) {
  app.use(express.static(BUNDLE_DIR));
  app.get('/', (req, res) => {
    res.sendFile(path.join(BUNDLE_DIR, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Home page of Antti. The server running with new changes!4');
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
