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
  credential: admin.credential.cert(require("./templelibrary-firebase-adminsdk-fbsvc-35b30123ae.json")),
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

    const userDocRef = usersRef.doc(email);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      const userData = userDoc.data();
      const passwordMatch = await bcrypt.compare(password, userData.hashedPassword);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      return res.status(200).json({
        user: { email, name: userData.name },
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

app.port("/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "Missing email, name, or password" });
    }

    const userDocRef = usersRef.doc(email);
    const userDoc = await userDocRef.get();

    if (userDoc.exists) {
      return res.status(400).json({ message: "User already exists."});
    } else {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newUser = {
        email,
        name,
        hashedPassword,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await userDocRef.set(newUser);

      return res.status(200).json({
        email: email,
        userData: newUser
      });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// POST /getUser — get user info from body
app.get("/get-user-info", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Missing email in body" });

    const userDocRef = usersRef.doc(email);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    return res.status(200).json({
      user: { email, name: userData.name },
    });
  } catch (err) {
    console.error("Get user error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

const isOverdue = (timestamp) => {
  const now = new Date();
  const checkedOutDate = timestamp.toDate();
  const diffDays = (now - checkedOutDate) / (1000 * 60 * 60 * 24);
  return diffDays > 14;
};

app.post('/checkout-books', async (req, res) => {
  try {
    const { email, books } = req.body;

    if (!email || !Array.isArray(books) || books.length === 0) {
      return res.status(400).json({ message: "Missing or invalid email/books in body" });
    }

    const userDocRef = usersRef.doc(email);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    const userBooks = userData.booksCheckedOut || [];

    const hasOverdue = currentBooks.some(book =>
      book.checkedOutAt && admin.firestore.Timestamp.prototype.isPrototypeOf(book.checkedOutAt)
        ? isOverdue(book.checkedOutAt)
        : false
    );
    if (hasOverdue) {
      return res.status(403).json({ message: "User has overdue books and cannot check out more." });
    }

    if (userBooks.length + books.length > 3) {
      return res.status(403).json({ message: 'User already has too many books checked out.' });
    }

    const firebaseTimestamp = admin.firestore.Timestamp.fromDate(new Date());
    const booksWithTime = books.map(book => ({
      title: book,
      checkedOutAt: firebaseTimestamp
    }));

    const updatedBooks = [...userBooks, ...booksWithTime];
    await userDocRef.set({ ...userData, booksCheckedOut: updatedBooks });

    return res.status(200).json({
      message: 'Successfully updated checked out books.',
      user: { email, name: userData.name, booksCheckedOut: updatedBooks }
    });

  } catch (err) {
    console.error("Checkout error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

app.post('/return-books', async (req, res) => {
  try {
    const { email, returnBooks } = req.body;

    if (!email || !Array.isArray(books) || books.length === 0) {
      return res.status(400).json({ message: "Missing or invalid email/books in body" });
    }

    const userDocRef = usersRef.doc(email);
    const userDoc = await userDocRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = userDoc.data();
    const currentBooks = userData.booksCheckedOut || [];

    const now = new Date();
    let totalFine = 0;

    let booksToKeep = []

    for (const book of currentBooks) {
      if (returnBooks.includes(book.title)) {
        const checkedOutDate = book.checkedOutAt.toDate();
        const daysHeld = (now - checkedOutDate) / (1000 * 60 * 60 * 24);
        if (daysHeld > 14) {
          const overdueWeeks = Math.ceil((daysHeld - 14) / 7);
          totalFine += overdueWeeks * 5;
        }
      } else {
        booksToKeep.push(book);
      }
    }

    await userDocRef.set({
      ...userData,
      booksCheckedOut: booksToKeep
    });

    return res.status(200).json({
      message: 'Books returned successfully.',
      totalFine: totalFine,
      user: {
        email,
        name: userData.name,
        booksCheckedOut: booksToKeep
      }
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

module.exports = app;
