import EditClient from "@/components/clients/Edit";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Heart, NotebookPenIcon, UserPlus2 } from "lucide-react";

import axios from "axios";
import CreateProfile from "@/components/clients/CreateProfile";
const page = async ({ params }: { params: { email: string } }) => {
  const { email } = await params;
  let data: any = null;
  try {
    let resp;
    if (email)
      resp = await axios.get(
        `http://localhost:3000/api/get-user/${decodeURIComponent(email)}`
      );
    data = resp?.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">
            <Card className="w-full max-w-3xl bg-white shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 relative flex justify-center items-center">
                CREATE YOUR PROFILE
              </CardHeader>
              <CardContent className="flex justify-center items-center p-10">
                <CreateProfile />
              </CardContent>
            </Card>
          </div>
        );
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-white shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 relative">
          <EditClient />

          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={`/${data.image + 1}.svg`}
                alt="Profile picture"
              />
            </Avatar>
            <div>
              <CardTitle className="text-sm md:text-2xl font-bold uppercase">
                {data.name}
              </CardTitle>
              <p className="text-blue-100">{data.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 hover:from-blue-300 hover:to-blue-400"
            >
              {data.role}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.split(",").map((skill: string, id: number) => (
                <Badge
                  key={id}
                  variant="outline"
                  className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 border-blue-200"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.interests.split(",").map((interest: string, id: number) => (
                <Badge
                  key={id}
                  variant="outline"
                  className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 border-blue-200"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <NotebookPenIcon className="text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Bio</h3>
            </div>
            <p className="text-blue-800 text-justify">{data.bio}</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <UserPlus2 className="text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-800">Following</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.following.map((i: string, id: number) => (
                <Badge
                  key={id}
                  variant="outline"
                  className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-600 border-blue-200"
                >
                  {i}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default page;
