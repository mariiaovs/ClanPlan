import dbConnect from "@/db/connect";
import Member from "@/db/models/Member";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const familyMember = await Member.findById(id);

    if (!familyMember) {
      return response.status(404).json({ status: "Member not found" });
    }

    response.status(200).json(familyMember);
  }

  if (request.method === "PATCH") {
    const updatedMemberData = request.body;
    await Member.findByIdAndUpdate(id, updatedMemberData, { new: true });
    response.status(200).json({ status: "Member profile updated successfully." });
  }
}
