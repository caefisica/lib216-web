import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, [router]);

  const checkSession = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      setErrorMessage(sessionError.message);
      return;
    }

    if (sessionData.session) {
      setMessage('Ya has iniciado sesión. Serás redirigido al panel de control en breve.');
      router.push('/dashboard');
    } else {
      // Si no existe ninguna sesión, comprobar si es necesario actualizar la sesión
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();

      if (refreshError) {
        // Si no podemos refrescar la sesión, debemos manejar el error silenciosamente ya que el usuario intentará iniciar sesión de todos modos.
        console.error('Error al refrescar la sesión:', refreshError.message)
      } else if (refreshData.session) {
        setMessage('You are already logged in. You will be redirected to dashboard shortly.');
        router.push('/dashboard');
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error('Error al iniciar sesión:', error.message);
      setErrorMessage('Error al iniciar sesión. Por favor, inténtelo de nuevo.')
    } else {
      setMessage('Revisa tu correo electrónico para el correo de confirmación.')
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión con el enlace mágico
          </h2>

          {/* Mostrar el mensaje de estado y error */}
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
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50' : ''}`}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar enlace de confirmación'}
            </button>
          </div>
        </form>

        <div className="mt-4">
          <Link href="/">
            <p className="text-indigo-500 hover:text-indigo-700">Regresar al inicio</p>
          </Link>
        </div>

      </div>
    </div>
  );
}
