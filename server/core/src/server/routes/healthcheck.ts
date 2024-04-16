import express from "express";

const router = express.Router();

export default router.get("/healthcheck", (req, res) => {
  console.log(`❤️ Got a healthcheck request`);
  res.json({ message: "I'm alive you fools!" });
});
