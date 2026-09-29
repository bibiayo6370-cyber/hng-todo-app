import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 300, default: "" },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Todo = model("Todo", todoSchema);
