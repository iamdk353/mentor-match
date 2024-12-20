"use client";
import { Edit } from "lucide-react";
import { redirect } from "next/navigation";

const EditClient = ({ email }: { email: string }) => {
  return (
    <div className="group absolute right-5 cursor-pointer  hover:scale-105 active:scale-95">
      <Edit
        className=" "
        onClick={() => {
          redirect(`/profile/${email}/edit`);
        }}
      />
    </div>
  );
};
export default EditClient;
