"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

export default function EmailSignInForm() {
  const [email, setEmail] = useState<null | string>(null);
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const signInResult = await signIn('resend', {
      email: email,
      callbackUrl: window.location.origin,
      redirect: false,
    });

    if (!signInResult?.ok) {
      toast({
        title: 'Well this did not work...',
        description: 'Something went wrong, please try again',
        variant: 'destructive',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      return;
    }

    toast({
      title: 'Check your email',
      description: 'A magic link has been sent to you',
    });
  };

  return (
    <form onSubmit={handleSignIn}>
      <h1 className="text-3xl font-semibold text-white">Log in</h1>
      <div className="space-y-4 mt-5">
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Email"
          className="bg-[#333] placeholder:text-xs placeholder:text-gray-400 w-full inline-block"
        />
        <Button
          type="submit"
          variant="destructive"
          className="w-full bg-[#e50914]"
        >
          Log in
        </Button>
      </div>
    </form>
  );
}
