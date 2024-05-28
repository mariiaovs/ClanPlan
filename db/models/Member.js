import mongoose from "mongoose";

const { Schema } = mongoose;

const memberSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, requred: true },
  owner: { type: String, required: true },
});

const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;
