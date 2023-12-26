"use client";

import { Button } from "@/components/ui/button";
import { FacebookIcon } from "lucide-react";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn("google")} variant="outline" size="icon">
      <FacebookIcon className="w-4 h-4" />
    </Button>
  );
}
