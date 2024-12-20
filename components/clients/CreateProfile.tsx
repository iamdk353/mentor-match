"use client";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
const CreateProfile = () => {
  return (
    <Button
      className="bg-blue-950 hover:bg-blue-900 active:scale-95"
      onClick={() => {
        redirect("/profile/edit");
      }}
    >
      Create Profile
    </Button>
  );
};
export default CreateProfile;
