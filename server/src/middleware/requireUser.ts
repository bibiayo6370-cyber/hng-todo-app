import { RequestHandler } from "express";
import mongoose from "mongoose";
import { User } from "../models/User";
import { wrap } from "./utils";

export const requireUser: RequestHandler = wrap(async (req, res, next) => {
  const id = req.header("x-user-id");
  if (!id || !mongoose.isValidObjectId(id)) {
    res.status(401).json({ error: "Missing or invalid user" });
    return;
  }
  const user = await User.findById(id);
  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }
  res.locals.userId = user._id;
  next();
});
