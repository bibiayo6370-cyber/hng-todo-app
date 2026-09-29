import { Router } from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { Todo } from "../models/Todo";
import { requireUser } from "../middleware/requireUser";
import { wrap } from "../middleware/utils";

const router = Router();
router.use(requireUser);

const createSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  description: z.string().trim().max(300).optional(),
});

const updateSchema = z.object({
  title: z.string().trim().min(1).max(100).optional(),
  description: z.string().trim().max(300).optional(),
  completed: z.boolean().optional(),
});

router.get(
  "/",
  wrap(async (_req, res) => {
    const todos = await Todo.find({ user: res.locals.userId }).sort({ createdAt: -1 });
    res.json(todos);
  })
);

router.post(
  "/",
  wrap(async (req, res) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }
    const todo = await Todo.create({ ...parsed.data, user: res.locals.userId });
    res.status(201).json(todo);
  })
);

router.patch(
  "/:id",
  wrap(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: res.locals.userId },
      parsed.data,
      { new: true }
    );
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json(todo);
  })
);

router.delete(
  "/:id",
  wrap(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({ error: "Invalid id" });
      return;
    }
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: res.locals.userId });
    if (!todo) {
      res.status(404).json({ error: "Todo not found" });
      return;
    }
    res.json({ success: true });
  })
);

export default router;
