"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/nextjs";
import { Popover } from "@radix-ui/react-popover";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
const page = () => {
  const { user } = useUser();
  const [skills, setSkills] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [image, setImage] = useState(1);
  const [mentor, setMentor] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ skills, name, interests, image, mentor });

    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8 rounded-md">
        <Card className="max-w-2xl mx-auto bg-blue-50">
          <CardHeader className="bg-blue-400 text-white">
            <CardTitle className="text-2xl font-bold">
              Update Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <div className="flex justify-center items-center space-x-6">
                  <Label>Image</Label>
                  <Popover>
                    <PopoverTrigger>
                      <Image
                        src={`/Oval-${image}.svg`}
                        alt="profile"
                        className="size-[6rem] mx-auto shadow-md rounded-full"
                        width={"48"}
                        height={"48"}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="grid grid-cols-4 gap-3">
                        {Array.from({ length: 11 }, (_, i) => i).map((i) => {
                          return (
                            <Image
                              src={`Oval-${i + 1}.svg`}
                              alt="profile"
                              className="cursor-pointer size-[2.5rem]"
                              width={32}
                              height={32}
                              onClick={() => {
                                setImage(i + 1);
                              }}
                              key={i}
                            />
                          );
                        })}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Roles</Label>
                <div className="flex space-x-4">
                  <Switch
                    id="mentor"
                    onCheckedChange={(e) => {
                      setMentor(e);
                    }}
                  />
                  <Label htmlFor="mentor">I am a Mentor</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>

                <Input
                  required
                  id="Name"
                  placeholder="eg. Walter White"
                  className="bg-white"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                {user ? (
                  <Input
                    required
                    id="email"
                    className="bg-white"
                    inert
                    value={user?.primaryEmailAddress?.emailAddress}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                ) : (
                  <Loader className="animate-spin" />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  required
                  id="skills"
                  placeholder="e.g., Chemistry teacher"
                  className="bg-white "
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interests">Interests (comma-separated)</Label>
                <Input
                  required
                  id="interests"
                  placeholder="e.g., Chemotherapy, Cancer treatment"
                  className="bg-white"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  required
                  id="bio"
                  placeholder="Tell us about yourself"
                  className="bg-white"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default page;
