import {useEffect, useState} from 'react';
import {supabase} from '../supabase';
import Link from 'next/link';
import {useRouter} from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (supabase.auth.getSession()) {
      setMessage('You are already logged in. You will be redirected to dashboard in 5 seconds.');
      setTimeout(() => router.push('/dashboard'), 5000);
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const {error} = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error('Error in login:', error);
      setErrorMessage('Error in login: ' + error.message);
    } else {
      setMessage('Mail has been successfully sent!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión con el enlace mágico
          </h2>

          {/* Display the status message and error message */}
          {message && <div className="text-green-500">{message}</div>}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enviar enlace mágico
            </button>
          </div>
        </form>

        <div className="mt-4">
          <Link href="/">
            <p className="text-indigo-500 hover:text-indigo-700">Regresar a la página de inicio</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
