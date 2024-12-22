import { NextResponse } from "next/server";
import connectMongo from "@/DB/connect";
import User from "@/model/user";
export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  const { email } = await params;

  await connectMongo();

  try {
    const user = await User.findOne(
      { email },
      { __v: 0, _id: 0, mentors: 0, students: 0 }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
