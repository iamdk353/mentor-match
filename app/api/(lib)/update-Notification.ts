import connectMongo from "@/DB/connect";
import User from "@/model/user";

const time = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
}).format(new Date());

const updateNotification = async (msg: string, email: string) => {
  await connectMongo();
  await User.findOneAndUpdate(
    {
      email,
    },
    { $push: { notifications: { $each: [`${msg},${time}`] } } }
  );
};

export default updateNotification;
