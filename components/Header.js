import Link from 'next/link'

export default function Header({ scrollHandler }) {
  return (
    <header className="relative bg-blue-500">
      <div className="mx-auto p-4 sm:p-6 lg:p-8 flex-grow flex flex-col">
        <div className="text-center flex-grow">
          <h1 className="text-2xl font-semibold text-white mb-6 uppercase">Biblioteca del 216</h1>

          <div className="flex items-center justify-between mt-auto">
            <Link href="/login">
              <p className="bg-white hover:bg-blue-200 text-blue-500 font-bold py-2 px-4 rounded">
                Iniciar sesión
              </p>
            </Link>
            <Link href="/dashboard">
              <p className="bg-white hover:bg-blue-200 text-blue-500 font-bold py-2 px-4 rounded">
                Para editores
              </p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
