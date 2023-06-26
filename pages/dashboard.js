import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../supabase'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [books, setBooks] = useState([])

  const fetchSession = async () => {
    let session = JSON.parse(localStorage.getItem('session'))

    if (!session || session.expiry_time < Date.now()) {
      session = await supabase.auth.getSession()
      localStorage.setItem('session', JSON.stringify(session))
    }

    console.log('session was fetched')

    if (session) {
      setUser(session.user)
      fetchBooks()
    } else {
      router.push('/login')
    }
  }

  useEffect(() => {
    fetchSession()

    const handleAuthChange = async (event, session) => {
      console.log(`Supabase auth event: ${event}`)

      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        setUser(session.user)
        fetchBooks()
        localStorage.setItem('session', JSON.stringify(session))
      }

      if (event === 'SIGNED_OUT') {
        setUser(null)
        setBooks([])
        localStorage.removeItem('session')
        router.push('/login')
      }
    }

    const authListener = supabase.auth.onAuthStateChange((event, session) => handleAuthChange(event, session))
  }, [])

  const fetchBooks = async () => {
    let { data: books, error } = await supabase.from('thelibrary').select('*')
    if (error) console.log('Error: ', error)
    else setBooks(books)
  }

  return (
    <div className="flex flex-col justify-between min-h-screen py-12 bg-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {
          user ? (
            <div>
              <h1 className="text-xl font-bold mb-6">Bienvenido, {user.email}</h1>
              <Link href="/admin/add">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Añadir libro</button>
              </Link>
              <div className="mt-8">
                {books.map((book, index) => (
                  <div key={index} className="border-b py-4">
                    <p className="font-bold">{book.title}</p>
                    <Link href={`/admin/edit?slug=${book.slug}`}>
                      <p className="text-blue-500 hover:text-blue-700">Editar libro</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-xl font-bold mb-6">You are not authenticated!</h1>
              <p className="mb-6">Please log in to access the dashboard.</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/login')}>Log In</button>
            </div>
          )
        }
      </div>
    </div>
  )
}
