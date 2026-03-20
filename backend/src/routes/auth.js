import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByEmail, createUser } from "../models/user.model.js";

const router = express.Router();

const generateToken = (userId, email) => {
  return jwt.sign(
    { user_id: userId, email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ── POST /api/auth/register ────────────────────────────────
router.post("/register", async (req, res) => {
  const { name, email, password, role = "both" } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existing = await getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({ name, email, password: hashedPassword, role });
    const token = generateToken(user.id, user.email);

    res.status(201).json({ token, user });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/auth/login ───────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id, user.email);

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
