import connectMongo from "@/DB/connect";
import User from "@/model/user";

const updateNotification = async (msg: string, email: string) => {
  console.log("updating notification for ", email, msg);
  await connectMongo();
  await User.findOneAndUpdate(
    {
      email,
    },
    { $push: { notifications: { $each: [msg] } } }
  );
};

export default updateNotification;
