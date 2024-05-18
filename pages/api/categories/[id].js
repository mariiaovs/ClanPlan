import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "DELETE") {
    await Category.findByIdAndDelete(id);
    await Task.updateMany(
      { category: id, isDone: { $ne: true } },
      { $set: { category: null } }
    );
    response.status(200).json({ status: "Category deleted successfully." });
  }

  if (request.method === "PUT") {
    const updatedCategory = request.body;
    await Category.findByIdAndUpdate(id, updatedCategory);
    const selectedMembers = updatedCategory.selectedMembers;
    await Task.updateMany(
      {
        category: id,
        isDone: { $ne: true },
        assignedTo: { $elemMatch: { $not: { $in: selectedMembers } } },
      },
      { $set: { assignedTo: [] } }
    );
    response.status(200).json({ status: "Category updated successfully." });
  }
}
