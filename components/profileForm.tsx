"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { ProfileCardProps } from "@/components/profile";
import { mongo } from "mongoose";
import { useRouter } from "next/router";
import { Loader } from "lucide-react";
const ProfileForm = ({
  setEdit,
}: {
  setEdit: Dispatch<SetStateAction<boolean>>;
}) => {
  // const router = useRouter();
  const [role, setRole] = useState("");
  const { user } = useUser();
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    interests: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", {
      ...formData,
      role,
      image: role === "MENTOR" ? 4 : 3,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    try {
      setSubmit(true);
      await axios.post("http://localhost:3000/api/create-user", {
        ...formData,
        role,
        image: role === "MENTOR" ? 4 : 3,
        email: user?.primaryEmailAddress?.emailAddress,
      });
      setSubmit(false);
    } catch (error) {
      console.log(error);
      setSubmit(false);
    }
    setFormData({
      name: "",
      skills: "",
      interests: "",
      bio: "",
    });

    setEdit(false);
    // router.push("/card");
  };

  return (
    <div className="min-h-screen">
      <div className="w-full bg-blue-300 h-[5rem] flex justify-center items-center text-2xl font-semibold text-blue-950 flex-col">
        <p>{!role ? `SELECT ROLE` : `${role}`}</p>
      </div>
      <ToggleGroup
        type="single"
        onValueChange={(e) => {
          setRole(e.toLocaleUpperCase());
        }}
      >
        <ToggleGroupItem
          value="mentor"
          className="flex flex-1 flex-col items-center cursor-pointer h-full"
        >
          <Card>
            <CardHeader>
              <CardTitle>Mentor</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={"/4.svg"}
                width={10}
                height={10}
                alt="profile image"
                className="size-[10rem]"
              />
            </CardContent>
          </Card>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="student"
          className="flex flex-1 flex-col items-center cursor-pointer h-full"
        >
          <Card>
            <CardHeader>
              <CardTitle>Student</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={"/3.svg"}
                width={10}
                height={10}
                alt="profile image"
                className="size-[10rem]"
              />
            </CardContent>
          </Card>
        </ToggleGroupItem>
      </ToggleGroup>
      {role && (
        <form
          onSubmit={handleSubmit}
          className="space-y-10 px-10 w-full md:w-[60%] mx-auto my-10"
        >
          <div className="space-y-2">
            <Label htmlFor="name">{role} Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{role} Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              inert
              defaultValue={user?.primaryEmailAddress?.emailAddress}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skills">{role} Skills (comma-separated)</Label>
            <Input
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. JavaScript, React, Node.js"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interests">
              {role} Interests (comma-separated)
            </Label>
            <Input
              id="interests"
              className="focus:ring-blue-300 focus:ring-1"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g. Web Development, AI, Data Science"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">{role} Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              className="min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-400"
          >
            {submit ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
};
export default ProfileForm;
