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
    const skillRegexArr = user.skills
      ?.split(",")
      .map((i: string) => new RegExp(i.trim(), "i"));
    const intrestsRegexArr = user.interests
      ?.split(",")
      .map((i: string) => new RegExp(i.trim(), "i"));

    console.log(skillRegexArr, intrestsRegexArr);
    const matchMentors = await User.find({
      $and: [
        { role: "Mentor" },
        { xp: { $gte: Number(user.xp) - 10, $lte: Number(user.xp) + 10 } },
        {
          skills: { $in: skillRegexArr },
        },
        {
          interests: { $in: intrestsRegexArr },
        },
      ],
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    if (matchMentors.length === 0) {
      return NextResponse.json({
        msg: "no mentors found based on your skills and interests update your profile",
      });
    }

    return NextResponse.json({
      matchMentors,
      skills: user.skills,
      intrestes: user.interests,
      xp: user.xp,
      msg: "mentors based on your skills and intrests",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
