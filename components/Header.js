import Link from 'next/link';

export default function Header({scrollHandler}) {
  return (
    <header className="relative bg-blue-600 shadow-md">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white uppercase tracking-wide">Biblioteca del 216</h1>
          <div className="flex space-x-4">
            <Link href="/login" className="text-white bg-transparent border border-white hover:bg-blue-700 hover:text-white text-sm font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">
              Iniciar sesión
            </Link>
            <Link href="/dashboard" className="text-white bg-transparent border border-white hover:bg-blue-700 hover:text-white text-sm font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">
              Para editores
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
