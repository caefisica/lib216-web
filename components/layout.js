export default function Layout({ children }) {
  return (
    <>
      <main>{children}</main>
      <footer className="center mt-5 flex justify-center space-x-4 bg-[#E7E8EF] p-4 text-xs">
        <p>Centro de Apoyo al Estudiante de Física</p>
        <span>|</span>
        <a
          href="https://goo.gl/maps/DoYp5LX9gtYNPBc27"
          className="font-medium text-orange-600"
        >
          Visítanos
        </a>
      </footer>
    </>
  )
}
