'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

type EmailAuthFormProps = {
  title: string;
  buttonText: string;
};

export default function EmailAuthForm({
  title,
  buttonText,
}: EmailAuthFormProps) {
  const [email, setEmail] = useState<null | string>(null);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authResult = await signIn('resend', {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (!authResult?.ok) {
      toast({
        title: 'Ha ocurrido un error',
        description: 'Algo ha salido mal, intenta de nuevo',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: title === 'Regístrate' ? 'Registro exitoso' : 'Revisa tu correo',
      description: 'Un correo con un enlace mágico ha sido enviado',
    });
  };

  return (
    <form onSubmit={handleAuth}>
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
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
          className="w-full bg-[#6d28d9]"
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
