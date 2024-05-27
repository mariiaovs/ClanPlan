import mongoose from "mongoose";
import "./Family";

const { Schema } = mongoose;

const memberSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, requred: true },
  family: { type: Schema.Types.ObjectId, ref: "Family" },
  profilePhoto: { type: String },
});

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;
