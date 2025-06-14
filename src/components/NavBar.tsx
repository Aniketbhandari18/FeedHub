"use client";

import * as React from "react";
import logo from "../../public/Logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { Tektur } from "next/font/google";

export const tektur = Tektur({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tektur",
});

export default function Navbar() {
  return (
    <nav className="mx-auto px-4 sm:px-6 lg:px-6 bg-white shadow-sm border-b border-gray-200">
      <div className="flex justify-between items-center h-16">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Image
              src={logo}
              alt="logo"
              className="size-11 mb-1 text-gray-700"
            />
            <span
              className={`text-xl font-semibold text-gray-700 ${tektur.className}`}
            >
              FeedHub
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                color="grey"
                className="hover:text-indigo-600 hover:bg-indigo-50"
              >
                Dashboard
              </Button>
            </Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Login</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign up</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}