import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import { auth } from '../utils/auth';

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect('/login');
  }

  return (
    <>
      <Navbar />
      <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
        {children}
      </main>
    </>
  );
}
