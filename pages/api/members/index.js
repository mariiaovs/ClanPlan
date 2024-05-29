import dbConnect from "@/db/connect";
import Member from "@/db/models/Member";
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
    const members = await Member.find({ owner: session.user.email });
    return response.status(200).json(members);
  }

  if (request.method === "POST") {
    try {
      const memberData = request.body;
      await Member.create({ ...memberData, owner: session.user.email });

      return response
        .status(201)
        .json({ status: "Family member added successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
