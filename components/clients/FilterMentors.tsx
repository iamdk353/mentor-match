"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { UserProfile } from "@/app/profile/edit/page";
import UserCard from "../card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  Filter,
  GraduationCap,
  Heart,
  Loader,
  Send,
  User,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
const FilterMentors = () => {
  const [userProfile, setuserProfile] = useState<UserProfile[]>();
  const [SelecteduserProfile, setSelectedUserProfile] = useState<UserProfile>();
  const [skills, setSkills] = useState("");
  const [intrests, setIntrests] = useState("");
  const [xp, setXp] = useState<number>();
  const [applyFilter, setApplyfilter] = useState(true);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoad(true);
      const resp = await axios.get(
        `http://localhost:3000/api/get-mentors${
          skills ? `?skills=${skills}` : ""
        }${intrests ? `&interests=${intrests}` : ""}${xp ? `&xp=${xp}` : ""}`
      );

      const data = await resp.data.mentors;

      setuserProfile(data);
      setLoad(false);
    }
    getData();
  }, [applyFilter]);

  return (
    <>
      {!SelecteduserProfile && (
        <div className="min-h-screen">
          <form
            className="h-[15rem] md:h-[5rem] bg-blue-200 w-[90%] mx-auto flex items-center p-3 space-x-3 flex-col md:flex-row justify-between "
            onSubmit={(e) => {
              e.preventDefault();
              setApplyfilter((prev) => !prev);
            }}
          >
            <div className="flex-1">
              <Label>Skills</Label>
              <Input
                required
                onChange={(e) => {
                  setSkills(e.target.value);
                }}
              />
            </div>
            <div className="flex-1">
              <Label>Intrests</Label>
              <Input
                required
                onChange={(e) => {
                  setIntrests(e.target.value);
                }}
              />
            </div>
            <div className="flex-1">
              <Label>XP</Label>
              <Input
                required
                type="number"
                onChange={(e) => {
                  setXp(Number(e.target.value));
                }}
              />
            </div>
            <Button className="bg-blue-700 hover:bg-blue-500" type="submit">
              Apply <Filter />
            </Button>
            <Button
              className="bg-blue-700 hover:bg-blue-500"
              type="reset"
              onClick={() => {
                setSkills("");
                setIntrests("");
                setXp(undefined);
                setApplyfilter((prev) => !prev);
              }}
            >
              Reset <X />
            </Button>
          </form>
          {load && <Loader className="animate-spin mx-auto" />}
          <div className="grid grid-cols-1 md:grid-cols-3 xl:md:grid-cols-5 w-[90%] mx-auto gap-4">
            {userProfile?.map((i) => {
              return (
                <UserCard
                  key={i.email}
                  data={{
                    name: i.name,
                    email: i.email,
                    image: i.image,
                    interests: i.interests,
                    skills: i.skills,
                    bio: i.bio,
                    xp: i.xp,
                  }}
                  setSelectedUser={setSelectedUserProfile}
                />
              );
            })}
          </div>
        </div>
      )}
      <div>
        {SelecteduserProfile && (
          <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4  ">
            <Card className="w-full max-w-3xl bg-white shadow-xl overflow-hidden relative">
              <ArrowLeft
                className="absolute right-3 top-3 size-8 text-blue-800 z-10 cursor-pointer"
                onClick={() => {
                  setSelectedUserProfile(undefined);
                }}
              />
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 relative">
                <Button className="absolute right-3 bottom-3 z-10">
                  Follow
                </Button>
                <div className="flex items-center space-x-4">
                  <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                    <AvatarImage
                      src={`/${SelecteduserProfile?.image!}.svg`}
                      alt="Profile picture"
                    />
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm md:text-2xl font-bold uppercase">
                      {SelecteduserProfile.name}
                    </CardTitle>
                    <p className="text-blue-100">{SelecteduserProfile.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 hover:from-blue-300 hover:to-blue-400"
                  >
                    {SelecteduserProfile.role
                      ? SelecteduserProfile.role
                      : "Mentor"}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-800">
                      Skills
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SelecteduserProfile.skills
                      .trim()
                      .split(",")
                      .map((skill: string, id: number) => (
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
                    <h3 className="text-lg font-semibold text-blue-800">
                      Interests
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {SelecteduserProfile.interests
                      .trim()
                      .split(",")
                      .map((interest: string, id: number) => (
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
                    <User className="text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-800">Bio</h3>
                  </div>
                  <p className="text-blue-800 text-justify">
                    {SelecteduserProfile.bio}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};
export default FilterMentors;
