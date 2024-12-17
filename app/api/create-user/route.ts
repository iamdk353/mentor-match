import { NextResponse } from "next/server";
import connectMongo from "@/DB/connect";
import User from "@/model/user";

export async function POST(request: Request) {
  try {
    await connectMongo();
    const {
      name,
      email,
      skills,
      interests,
      role,
      bio,
      students,
      mentors,
      image,
    } = await request.json();
    const userData = {
      name,
      email,
      skills,
      interests,
      role,
      bio,
      students,
      mentors,
      image,
    };

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: userData },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { message: "User updated or created successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating or creating user", error },
      { status: 500 }
    );
  }
}
