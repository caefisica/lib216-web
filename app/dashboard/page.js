"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../supabase';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  const fetchSession = useCallback(async () => {
    let session = JSON.parse(localStorage.getItem('session'));

    if (!session || session.expiry_time < Date.now()) {
      session = await supabase.auth.getSession();
      localStorage.setItem('session', JSON.stringify(session));
    }

    // console.log('La sesión fue encontrada: ', session);

    if (session) {
      setUser(session.user);
      fetchBooks();
    } else {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    fetchSession();

    const handleAuthChange = async (event, session) => {
      console.log(`Supabase auth event: ${event}`);

      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setUser(session.user);
        fetchBooks();
        localStorage.setItem('session', JSON.stringify(session));
      }

      if (event === 'SIGNED_OUT') {
        setUser(null);
        setBooks([]);
        localStorage.removeItem('session');
        router.push('/login');
      }
    };
    /* eslint-disable-next-line no-unused-vars */
    const authListener = supabase.auth.onAuthStateChange((event, session) =>
      handleAuthChange(event, session),
    );
  }, [fetchSession, router]);

  const fetchBooks = async () => {
    const { data: books, error } = await supabase
      .from('thelibrary')
      .select('*');
    if (error) console.log('Error: ', error);
    else setBooks(books);
  };

  return (
    <div className="flex flex-col h-full py-12">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-lg">
        {user ? (
          <>
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">
              Bienvenido, {user.email}
            </h1>
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/admin/add"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Añadir libro
              </Link>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Regresar al inicio
              </Link>
            </div>
            <div className="space-y-6">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  {' '}
                  {/* Card-like styling */}
                  <h2 className="font-bold text-xl text-gray-800 mb-2">
                    {book.title}
                  </h2>
                  <Link
                    href={`/admin/edit?slug=${book.slug}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Editar libro
                  </Link>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
              Todavía no iniciaste sesión
            </h1>
            <p className="mb-6">
              Por favor, inicia sesión para acceder al panel de control.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
              onClick={() => router.push('/login')}
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
