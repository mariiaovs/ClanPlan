import mongoose from "mongoose";
import "./Member";

const { Schema } = mongoose;

const categorySchema = new Schema({
  title: { type: String, required: true },
  selectedMembers: {
    type: [Schema.Types.ObjectId],
    ref: "Member",
    required: true,
  },
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
