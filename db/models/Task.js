import mongoose from "mongoose";
import "./Category";
import "./Member";
import "./Comment";
import "./Family";

const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  priority: { type: String },
  dueDate: { type: String },
  isDone: { type: Boolean },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  assignedTo: { type: [Schema.Types.ObjectId], ref: "Member" },
  groupId: { type: String },
  repeat: { type: String },
  endDate: { type: String },
  comments: { type: [Schema.Types.ObjectId], ref: "Comment" },
  owner: { type: String, required: true },
  family: { type: [Schema.Types.ObjectId], ref: "Family" },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
