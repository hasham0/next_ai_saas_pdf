import { FileText } from "lucide-react";
import NavLink from "@/components/shared/nav-link";
import { Button } from "@/components/ui/button";

type Props = {};

const Header = ({}: Props) => {
  const isLoggedIn = false;
  return (
    <header>
      <nav className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <NavLink
            href={"/"}
            className="flex shrink-0 items-center gap-1 lg:gap-2"
          >
            <FileText className="size-5 transform text-gray-900 transition duration-200 ease-in-out hover:rotate-12 lg:size-8" />
            <span className="font-extrabold text-gray-900 lg:text-xl">
              Sommaire
            </span>
          </NavLink>
        </div>
        <div className="flex gap-4 lg:items-center lg:justify-center lg:gap-12">
          <NavLink href={"/#pricing"}>Pricing</NavLink>
          {isLoggedIn && <NavLink href={"/dashboard"}>Dashboard</NavLink>}
        </div>
        <div className="flex items-center lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <NavLink href={"/upload"}>Upload a PDF</NavLink>
              <div>Pro</div>
              <Button>User</Button>
            </div>
          ) : (
            <div>
              <NavLink href={"/sign-in"}>Sign In</NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
