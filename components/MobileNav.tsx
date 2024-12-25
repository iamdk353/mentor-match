import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { BellIcon, Menu } from "lucide-react";
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
          <SelectItem value="1">
            <Link href={`/profile/${user?.primaryEmailAddress?.emailAddress}`}>
              <Button
                variant={"link"}
                className="text-blue-600 hover:text-blue-800"
              >
                Profile
              </Button>
            </Link>
          </SelectItem>
          <SelectItem value="2">
            <Link href="/explore">
              <Button
                variant={"link"}
                className="text-blue-600 hover:text-blue-800"
              >
                Explore
              </Button>
            </Link>
          </SelectItem>
          <SelectItem value="3">
            <Link
              href={`/notifications`}
              className="text-blue-600 hover:text-blue-800 bg-red-500 w-full"
            >
              <BellIcon />
            </Link>
          </SelectItem>
          <SelectItem value="4">
            <SignOutButton>
              <Button className="text-blue-600 hover:text-blue-800  bg-blue-300 hover:bg-blue-200">
                Logout
              </Button>
            </SignOutButton>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default MobileNav;
