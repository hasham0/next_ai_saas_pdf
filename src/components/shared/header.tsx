import { FileText } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavLink from "@/components/shared/nav-link";
import PlanBadge from "@/components/shared/plan-badge";

type Props = {};

const Header = ({}: Props) => {
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
          <SignedIn>
            <NavLink href={"/dashboard"}>Your Summaries</NavLink>
          </SignedIn>
        </div>
        <div className="flex items-center lg:flex-1 lg:justify-end">
          <SignedIn>
            <div className="flex items-center gap-4">
              <NavLink href={"/upload"}>Upload a PDF</NavLink>
              <PlanBadge />
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </SignedIn>

          <SignedOut>
            <NavLink href={"/sign-in"}>Sign In</NavLink>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
