"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Axis3D, Edit } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
export interface ProfileCardProps {
  name: string;
  email: string;
  skills: string;
  interests: string;
  bio: string;
  image: Number;
  role: string;
}

import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { constants } from "buffer";
export default function ProfileCard({
  setEdit,
}: {
  email?: string;
  setEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [userData, setuserData] = useState<ProfileCardProps>();
  const { user } = useUser();

  useEffect(() => {
    async function getUserData() {
      console.log("userdata called");
      try {
        console.log(
          `http://localhost:3000/api/get-user/${user?.primaryEmailAddress?.emailAddress}`
        );
        if (user?.primaryEmailAddress?.emailAddress) {
          const resp = await axios.get(
            `http://localhost:3000/api/get-user/${user?.primaryEmailAddress?.emailAddress}`
          );
          const data: ProfileCardProps = await resp.data;
          if (data) {
            setuserData(data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, []);
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden relative">
      <Edit
        className="absolute right-5 top-5 cursor-pointer text-white"
        onClick={() => {
          setEdit(true);
        }}
      />
      <div className="bg-gradient-to-br from-blue-400 to-purple-500 p-6">
        <CardHeader className="flex flex-col items-center space-y-4 pb-2">
          <Avatar className="w-24 h-24 border-4 border-white">
            <AvatarImage src={`/${userData?.image}.svg`} alt={userData?.name} />
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-1">
              {userData?.role.toUpperCase()}
            </h2>
            <h3 className="text-xl font-semibold text-white">
              {userData?.name}
            </h3>
            <p className="text-sm text-blue-100">{userData?.email}</p>
          </div>
        </CardHeader>
      </div>
      <CardContent className="space-y-4 p-6 bg-gradient-to-b from-blue-50 to-white">
        <div>
          <h4 className="font-semibold text-blue-600 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {userData?.skills.split(",").map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-100 text-blue-600 hover:bg-blue-200"
              >
                {skill.trim()}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-blue-600 mb-2">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {userData?.interests.split(",").map((interest, index) => (
              <Badge
                key={index}
                variant="outline"
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                {interest.trim()}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-blue-600 mb-2">Bio</h4>
          <p className="text-sm text-gray-700">{userData?.bio}</p>
        </div>
      </CardContent>
    </Card>
  );
}
