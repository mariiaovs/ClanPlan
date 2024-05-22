import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const category = await Category.find()
      .populate("selectedMembers")
      .sort({ title: "asc" });
    return response.status(200).json(category);
  }

  if (request.method === "POST") {
    try {
      const categoryData = request.body;
      await Category.create(categoryData);

      return response
        .status(201)
        .json({ status: "Category added successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
