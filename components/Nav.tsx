"use client";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { SignOutButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
// const { user, isLoaded } = useUser();
const Nav = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <div className="">
      <nav className="container mx-auto px-6 py-4">
        <div className=" justify-between items-center flex">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            MentorMatch
          </Link>
          {!isLoaded && <Loader className="animate-spin" />}
          {isSignedIn && (
            <div>
              <div className="space-x-4 hidden md:flex items-center">
                <Link
                  href={`/profile/${user.primaryEmailAddress?.emailAddress}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Profile
                </Link>
                <Link
                  href="/explore"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Explore
                </Link>
                <Link
                  href={`/foryou/${user.primaryEmailAddress?.emailAddress}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  For you
                </Link>
                <SignOutButton>
                  <Button className="text-blue-600 hover:text-blue-800 bg-blue-300 hover:bg-blue-200">
                    Logout
                  </Button>
                </SignOutButton>
              </div>
              <MobileNav />
            </div>
          )}
          {!isSignedIn && (
            <SignUpButton>
              <Button className="text-blue-600 hover:text-blue-800 bg-blue-300 hover:bg-blue-200">
                Sign UP
              </Button>
            </SignUpButton>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Nav;
