import dbConnect from "@/db/connect";
import Member from "@/db/models/Member";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const members = await Member.find();
    return response.status(200).json(members);
  }

  if (request.method === "POST") {
    try {
      const memberData = request.body;
      await Member.create(memberData);

      return response
        .status(201)
        .json({ status: "Family member added successfully." });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
