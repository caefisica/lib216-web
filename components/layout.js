export default function Layout({children}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-grow items-center justify-center">{children}</main>
      <footer className="text-center py-6 bg-gray-800 text-white">
        <p>© 2023 CAE-Física. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
