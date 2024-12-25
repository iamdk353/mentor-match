import { UserProfile } from "@/app/profile/edit/page";
import axios from "axios";

const page = async ({ params }: { params: { email: string } }) => {
  const { email } = await params;
  let data: UserProfile[];
  try {
    const resp = await axios.get("http://localhost:3000/api/matches/" + email);
    data = await resp.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  return <div className="h-screen"></div>;
};
export default page;
