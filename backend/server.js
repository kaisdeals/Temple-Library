const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const SALT_ROUNDS = 10;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Firebase Admin Initialization
admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")),
});
const db = admin.firestore();
const usersRef = db.collection("users");

// POST /login — create user or return if exists
app.post("/login", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "Missing email, name, or password" });
    }

    const snapshot = await usersRef.where("email", "==", email).get();

    let user;
    if (!snapshot.empty) {
      user = snapshot.docs[0];
      const userData = user.data();

      const passwordMatch = await bcrypt.compare(password, userData.hashedPassword);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      return res.status(200).json({ user: { id: user.id, email: userData.email, name: userData.name } });
    }

    // User doesn't exist — create new one
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = {
      email,
      name,
      hashedPassword,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const newDoc = await usersRef.add(newUser);

    return res.status(201).json({ user: { id: newDoc.id, email, name } });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// POST /getUser — get user info from body
app.post("/getUser", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Missing email in body" });

    const snapshot = await usersRef.where("email", "==", email).get();
    if (snapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = snapshot.docs[0];
    const userData = user.data();

    res.status(200).json({ user: { id: user.id, email: userData.email, name: userData.name } });
  } catch (err) {
    console.error("Get user error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
