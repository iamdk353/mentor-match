import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Menu } from "lucide-react";
import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
const MobileNav = () => {
  const { user } = useUser();
  return (
    <div className="md:hidden">
      <Select>
        <SelectTrigger>
          <Menu />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default MobileNav;
