import Navbar from '@/app/components/Navbar';
import { SiteFooter } from '@/app/components/SiteFooter';
import { auth } from '@/app/utils/auth';
import { User } from '@/lib/types';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inicio',
  description:
    'Una ventana a la biblioteca de la Facultad de Ciencias Físicas de la UNMSM',
};

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect('/login');
  }

  const user: User = {
    name: session.user?.name ?? 'Default Name',
    email: session.user?.email ?? 'default@email.com',
    image: session.user?.image ?? '/public/images/cbo.jpeg',
  };

  return (
    <>
      <Navbar user={user} />
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
