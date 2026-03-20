import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getOpenRequests,
  getMyRequests,
  createRequest,
  acceptRequest,
  completeRequest,
  getRequestById,
} from "../models/help.model.js";
import sql from "../config/db.js";

const router = express.Router();

// ── GET /api/help/open ─────────────────────────────────────
router.get("/open", authMiddleware, async (req, res) => {
  try {
    const requests = await getOpenRequests();
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ── GET /api/help/my ───────────────────────────────────────
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const requests = await getMyRequests(req.user.user_id);
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/help ─────────────────────────────────────────
router.post("/", authMiddleware, async (req, res) => {
  const { title, description, category, urgency = "low", location } = req.body;

  if (!title || !description || !category || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const request = await createRequest({
      title, description, category, urgency, location,
      userId: req.user.user_id,
    });
    res.status(201).json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ── PUT /api/help/accept/:id ───────────────────────────────
router.put("/accept/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const existing = await getRequestById(id);
    if (!existing) return res.status(404).json({ message: "Request not found" });
    if (existing.status !== "open") return res.status(400).json({ message: "Request is no longer available" });
    if (existing.requester_id === req.user.user_id) return res.status(400).json({ message: "You cannot accept your own request" });

    const updated = await acceptRequest(id, req.user.user_id);
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ── PUT /api/help/complete/:id ─────────────────────────────
router.put("/complete/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await completeRequest(id, req.user.user_id);
    if (!updated) return res.status(404).json({ message: "Request not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ── POST /api/help/rate/:id ────────────────────────────────
router.post("/rate/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { score, comment } = req.body;

  if (!score || score < 1 || score > 5) {
    return res.status(400).json({ message: "Score must be between 1 and 5" });
  }

  try {
    const request = await getRequestById(id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    if (request.status !== "completed") return res.status(400).json({ message: "Can only rate completed requests" });
    if (request.requester_id !== req.user.user_id) return res.status(403).json({ message: "Only requester can rate" });

    // Save rating
    await sql`
      INSERT INTO ratings (request_id, rated_by, rated_user, score, comment)
      VALUES (${id}, ${req.user.user_id}, ${request.helper_id}, ${score}, ${comment || null})
    `;

    // Update helper average rating
    await sql`
      UPDATE users SET
        total_ratings = total_ratings + 1,
        rating = ((rating * total_ratings) + ${score}) / (total_ratings + 1)
      WHERE id = ${request.helper_id}
    `;

    res.json({ message: "Rating submitted! ⭐" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
