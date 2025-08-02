import connectDB from "@/db/mongoosedb";
import User from "@/models/user";

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get("email");
  if (!email) return new Response(JSON.stringify({ error: "Missing email" }), { status: 400 });

  await connectDB();
  const user = await User.findOne({ email });
  return new Response(JSON.stringify({ user }), { status: 200 });
}
