"use client"

import { usePathname } from "next/navigation";
import Navbar from "./NavBar";

export default function() {
  const pathName = usePathname();

  const hideNavbarOnRoutes = ["/sign-in", "/sign-up"];

  const shouldHideNavbar = hideNavbarOnRoutes.some((route) => pathName.startsWith(route));

  if (shouldHideNavbar) return null;

  return <Navbar />
}