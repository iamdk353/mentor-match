"use client";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
export interface UserProfile {
  email: string;
  bio: string;
  interests: string;
  name: string;
  role?: string;
  skills: string;
  image?: number;
  following?: string[];
  followers?: string[];
  xp?: number;
}

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Loader } from "lucide-react";
import toast, { Toast } from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const { user } = useUser();
  const [selectchange, setSelectchange] = useState("Mentor");
  const [load, setLoad] = useState(false);
  const [image, setImage] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    email: user?.primaryEmailAddress?.emailAddress as string,
    bio: "",
    interests: "",
    name: "",
    role: "",
    skills: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: name === "image" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoad(true);
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/api/create-user/", {
        ...profile,
        role: selectchange,
        image,
      });
      setLoad(false);
      toast.success("updated profile");
      router.push("/profile/" + user?.primaryEmailAddress?.emailAddress);
    } catch (error) {
      toast.error("failed to update");
    }
  };

  useEffect(() => {
    async function getData() {
      console.log("get data");
      try {
        const resp = await axios.get(
          `http://localhost:3000/api/get-user/${user?.primaryEmailAddress?.emailAddress}`
        );
        console.log(resp.data);
        if (resp.data) {
          setProfile(resp.data);
          setSelectchange(resp.data.role);
          setImage(resp.data.image ? resp.data.image : 2);
        }
      } catch (error) {}
    }
    getData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow-md p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          User Profile
        </h2>
        <div>
          <Label htmlFor="image" className="text-blue-600">
            Image
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Image
                src={`/${image + 1}.svg`}
                width={10}
                height={10}
                alt="profile"
                className="size-[7rem] mx-auto"
              />
            </PopoverTrigger>
            <PopoverContent className="w-80 grid grid-cols-4 gap-3">
              {Array.from({ length: 11 }, (_, i) => i).map((i) => (
                <Image
                  src={`/${i + 1}.svg`}
                  key={i}
                  width={10}
                  height={10}
                  alt="profile"
                  className="size-[7rem] mx-auto hover:bg-slate-200 p-1 rounded-md"
                  onClick={() => {
                    setImage(i);
                  }}
                />
              ))}
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="name" className="text-blue-600">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            defaultValue={profile.name}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-blue-600">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            inert
            name="email"
            defaultValue={
              profile.email || user?.primaryEmailAddress?.emailAddress
            }
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="role" className="text-blue-600">
            Role
          </Label>
          <Select
            name="role"
            onValueChange={(e) => {
              setSelectchange(e);
            }}
            required
          >
            <SelectTrigger color="text-blue-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent defaultValue={"Mentor"}>
              <SelectItem value="Mentor">Mentor</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
            </SelectContent>
          </Select>

          {/* <Input
            type="text"
            id="role"
            name="role"
            value={profile.role}
            onChange={handleChange}
            required
            className="mt-1"
          /> */}
        </div>

        <div>
          <Label htmlFor="bio" className="text-blue-600">
            Bio
          </Label>
          <Textarea
            id="bio"
            name="bio"
            rows={5}
            defaultValue={profile.bio}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="interests" className="text-blue-600">
            Interests
          </Label>
          <Input
            type="text"
            id="interests"
            name="interests"
            defaultValue={profile.interests}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="skills" className="text-blue-600">
            Skills
          </Label>
          <Input
            type="text"
            id="skills"
            name="skills"
            defaultValue={profile.skills}
            onChange={handleChange}
            required
            className="mt-1"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          disabled={load}
        >
          {load ? <Loader className="animate-spin" /> : " Submit Profile"}
        </Button>
      </form>
    </div>
  );
};
export default Page;
