import EmailAuthForm from '@/app/components/EmailAuthForm';
import GithubSignInButton from '@/app/components/GithubSignInButton';
import GoogleSignInButton from '@/app/components/GoogleSignInButton';
import { auth } from '@/app/utils/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await auth();

  if (session) {
    return redirect('/home');
  }
  return (
    <div className="mt-24 rounded bg-black/80 py-10 px-6 md:mt-0 md:max-w-sm md:px-14">
      <EmailAuthForm title="Inicia sesión" buttonText="Iniciar sesión" />

      <div className="text-gray-500 text-sm mt-2">
        ¿Nuevo miembro?{' '}
        <Link className="text-white hover:underline" href="/sign-up">
          Regístrate ahora
        </Link>
      </div>

      <div className="flex w-full justify-center items-center gap-x-3 mt-6">
        <GithubSignInButton />
        <GoogleSignInButton />
      </div>
    </div>
  );
}

export const runtime = 'edge';
