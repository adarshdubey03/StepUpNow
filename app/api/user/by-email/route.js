import connectDB from "@/db/mongoosedb";
import User from "@/models/user";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) return Response.json({ success: false });

  try {
    await dbConnect();
    const user = await User.findOne({ email });
    return Response.json({ success: true, user });
  } catch (err) {
    console.error("Error fetching user by email:", err);
    return Response.json({ success: false });
  }
}
