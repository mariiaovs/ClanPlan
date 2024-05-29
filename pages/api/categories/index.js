import dbConnect from "@/db/connect";
import Category from "@/db/models/Category";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === "GET") {
    const category = await Category.find({ owner: session.user.email })
      .populate("selectedMembers")
      .sort({ title: "asc" });
    return response.status(200).json(category);
  }

  if (request.method === "POST") {
    try {
      const categoryData = request.body;
      await Category.create({ ...categoryData, owner: session.user.email });

      return response
        .status(201)
        .json({ status: "Category added successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
