import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/DB/connect";
import User from "@/model/user";
import { UserProfile } from "@/app/profile/edit/page";
export async function GET(req: NextRequest) {
  function mentorShuffle(array: UserProfile[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  try {
    const { searchParams } = new URL(req.url);
    const xp = searchParams.get("xp");
    const skill = searchParams.get("skills");
    const interest = searchParams.get("interests");
    await connectMongo();
    if (xp || skill || interest) {
      const skillRegexArr = skill?.split(",").map((i) => new RegExp(i, "i"));
      const intrestsRegexArr = interest
        ?.split(",")
        .map((i) => new RegExp(i, "i"));
      const mentors = await User.find({
        $and: [
          { role: "Mentor" },
          { xp: { $gte: Number(xp) - 5, $lte: Number(xp) + 5 } },
          {
            skills: { $in: skillRegexArr },
          },
          {
            interests: { $in: intrestsRegexArr },
          },
        ],
      });
      if (mentors.length === 0) {
        const mentors = await User.find({
          $and: [{ role: "Mentor" }, { xp: { $gte: 85, $lte: 100 } }],
        });
        return NextResponse.json({
          mentors: mentorShuffle(mentors),
          msg: "could not find users for query top mentors for you",
        });
      }
      return NextResponse.json({
        mentors: mentorShuffle(mentors),
      });
    } else {
      const mentors = await User.find({
        role: "Mentor",
      });
      return NextResponse.json({
        mentors: mentorShuffle(mentors),
        msg: "all mentors",
      });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}
