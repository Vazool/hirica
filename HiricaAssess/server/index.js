import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

// Example Zod schema
const skillSchema = z.object({
  skill: z.string(),
  level: z.number().min(1).max(5),
});

// Basic test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hirica backend is running 🚀" });
});

// Example POST route with validation
app.post("/skill", (req, res) => {
  const result = skillSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  res.json({ ok: true, data: result.data });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});