import { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up | Sommaire",
};

export default function Page() {
  return <SignUp />;
}
