import mongoose from "mongoose";
import "./Member";
import "./Family";

const { Schema } = mongoose;

const categorySchema = new Schema({
  title: { type: String, required: true },
  selectedMembers: {
    type: [Schema.Types.ObjectId],
    ref: "Member",
    required: true,
  },
  family: { type: [Schema.Types.ObjectId], ref: "Family" },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
