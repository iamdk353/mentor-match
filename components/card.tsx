import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Code, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dispatch, SetStateAction } from "react";
import { UserProfile } from "@/app/profile/edit/page";

type UserCardProps = {
  data: UserProfile;
  setSelectedUser: Dispatch<SetStateAction<UserProfile | undefined>>;
};

const UserCard = ({ data, setSelectedUser }: UserCardProps) => {
  return (
    <Card className="w-72 bg-blue-50 shadow-md hover:shadow-lg transition-all duration-300  relative group">
      <Badge
        className="absolute bg-blue-500 right-2 top-2 hidden group-hover:flex cursor-pointer hover:bg-blue-700"
        onClick={() => {
          console.log("selected user ", data);
          setSelectedUser(data);
        }}
      >
        View profile
      </Badge>
      <CardContent className="p-6 flex flex-col items-center">
        <Avatar className="w-24 h-24 border-4 border-blue-500 rounded-full">
          <AvatarImage src={`/${data.image}.svg`} alt="Profile picture" />
        </Avatar>
        <h3 className="mt-4 text-xl font-semibold text-blue-800">
          {data.name}
        </h3>
        <p className="mt-2 text-sm text-blue-600 text-center hidden md:block">
          {data.email}
        </p>

        <div className="mt-4 w-full">
          <div className="flex items-center mb-2">
            <Code className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Skills</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.skills
              .split(",")
              .splice(0, 3)
              .map((skill, id) => (
                <Badge
                  key={Math.random() + id}
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  {skill}
                </Badge>
              ))}
          </div>
        </div>

        <div className="mt-4 w-full">
          <div className="flex items-center mb-2">
            <Heart className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Interests</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.interests
              .split(",")
              .splice(0, 3)
              .map((interest, id) => (
                <Badge
                  key={Math.random() + id}
                  variant="outline"
                  className="border-blue-300 text-blue-600"
                >
                  {interest}
                </Badge>
              ))}
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-blue-500" />
            </div>
            <span className="text-sm font-semibold text-blue-600">
              {data.xp} XP
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default UserCard;
