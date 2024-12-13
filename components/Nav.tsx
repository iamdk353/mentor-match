"use client";
import Link from "next/link";
import MobileNav from "./MobileNav";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useUser,
} from "@clerk/clerk-react";
import { Butcherman } from "next/font/google";
import { Button } from "./ui/button";
const Nav = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  return (
    <div>
      <nav className="container mx-auto px-6 py-4">
        <div className=" justify-between items-center flex">
          <Link href="/sign-up" className="text-2xl font-bold text-blue-600">
            MentorMatch
          </Link>
          {isSignedIn && (
            <div>
              <div className="space-x-4 hidden md:flex items-center">
                <Link href="#" className="text-blue-600 hover:text-blue-800">
                  About
                </Link>
                <Link href="#" className="text-blue-600 hover:text-blue-800">
                  Features
                </Link>
                <Link href="#" className="text-blue-600 hover:text-blue-800">
                  Contact
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
