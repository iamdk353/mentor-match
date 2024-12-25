import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/DB/connect";
import User from "@/model/user";
import updateNotification from "../(lib)/update-Notification";
export async function GET(req: NextRequest) {
  try {
    await connectMongo();
    const { searchParams } = new URL(req.url);
    const student = searchParams.get("student");
    const mentor = searchParams.get("mentor");

    await User.findOneAndUpdate(
      {
        email: student,
      },
      { $addToSet: { following: { $each: [mentor] } } }
    );
    await User.findOneAndUpdate(
      {
        email: mentor,
      },
      { $addToSet: { followers: { $each: [student] } } }
    );
    if (mentor && student) {
      await updateNotification(
        `you recived a follow request from ${student}`,
        mentor
      );
      await updateNotification(`you Started to follow ${mentor}`, student);
    }

    return NextResponse.json({ msg: "followed" });
  } catch (error) {
    return NextResponse.json(
      { msg: "error in following user", error },
      { status: 500 }
    );
  }
}
