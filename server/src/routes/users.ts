import { Router } from "express";
import { z } from "zod";
import { User } from "../models/User";
import { wrap } from "../middleware/utils";

const router = Router();

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email"),
});

router.post(
  "/",
  wrap(async (req, res) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }
    const { name, email } = parsed.data;
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { name },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(user);
  })
);

export default router;
