"use client";

import { GithubIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "../../components/ui/button";

export default function GithubSignInButton() {
  return (
    <Button onClick={() => signIn("github")} variant="outline" size="icon">
      <GithubIcon className="w-4 h-4" />
    </Button>
  );
}
