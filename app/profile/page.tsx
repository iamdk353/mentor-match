"use client";
import ProfileCard from "@/components/profile";
import ProfileForm from "@/components/profileForm";
import { useUser } from "@clerk/nextjs";
import { Edit } from "lucide-react";
import { useState } from "react";

const page = () => {
  const { user } = useUser();
  const [edit, setEdit] = useState(false);
  return (
    <>
      {edit ? (
        <ProfileForm setEdit={setEdit} />
      ) : (
        // <p>hello</p>
        <>
          <ProfileCard setEdit={setEdit} />
        </>
      )}
    </>
  );
};
export default page;
