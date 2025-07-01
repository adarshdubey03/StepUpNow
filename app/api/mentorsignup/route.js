import connectDB from "@/db/mongoosedb";
import Mentor from "@/models/mentor";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const mentor = new Mentor({
      ...body,
      skills: body.skills.split(",").map(s => s.trim()), // convert CSV string to array
    });
    await mentor.save();
    return new Response(JSON.stringify({ success: true, mentor }), {
      status: 201,
    });
  } catch (err) {
    console.error("Error creating mentor:", err);
    return new Response(JSON.stringify({ error: "Failed to create mentor" }), {
      status: 500,
    });
  }
}

