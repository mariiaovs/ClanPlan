import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
  message: { type: String, required: true },
  date: { type: Date, requred: true },
  updatedDate: { type: Date },
  owner: { type: String, required: true },
});

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;
