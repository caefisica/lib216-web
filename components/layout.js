import Header from './Header';

export default function Layout({children, scrollHandler}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header scrollHandler={scrollHandler} />
      <main className="flex flex-grow justify-center bg-gray-100">{children}</main>
      <footer className="text-center py-6 bg-gray-800 text-white">
        <p>© 2023 Centro de Apoyo al Estudiante de Física. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
