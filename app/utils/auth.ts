import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import type { SendVerificationRequestParams } from 'next-auth/providers';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import prisma from './db';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }) as any,
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }) as any,
    {
      id: 'resend',
      type: 'email',
      async sendVerificationRequest({
        identifier: email,
        url,
        token
      }: SendVerificationRequestParams) {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.AUTH_EMAIL_SERVER_PASSWORD}`,
          },
          body: JSON.stringify({
            from: process.env.AUTH_EMAIL_FROM,
            to: [email],
            subject: "Your sign-in link",
            html: `<p>Please use the following link to sign in:</p><p><a href="${url}">Sign in</a></p>`,
          }),
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
      },
    },
  ],
});
