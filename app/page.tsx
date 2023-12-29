import { redirect } from 'next/navigation';
import { auth } from './utils/auth';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return redirect('/login');
  } else {
    return redirect('/home');
  }
}

export const runtime = 'edge';
