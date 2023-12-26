"use client";

import { FacebookIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "../../components/ui/button";

export default function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn("google")} variant="outline" size="icon">
      <FacebookIcon className="w-4 h-4" />
    </Button>
  );
}
