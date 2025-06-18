import { headers } from "next/headers";
import Navbar from "./NavBar";

export default async function Header() {
  const header = await headers();
  const pathname = header.get("referer") || "/";

  const hideNavbarOnRoutes = ["/sign-in", "/sign-up"];
  const shouldHideNavbar = hideNavbarOnRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHideNavbar) return null;

  return <Navbar />;
}