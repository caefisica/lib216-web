import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../supabase'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetchSession()
    fetchBooks()
  }, [])

  const fetchSession = () => {
    const user = supabase.auth.getUser()

    if (user) {
      setUser(user)
    } else {
      router.push('/login')
    }
  }

  const fetchBooks = async () => {
    let { data: books, error } = await supabase.from('thelibrary').select('*')
    if (error) console.log('Error: ', error)
    else setBooks(books)
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {
        user ? (
          <div className="bg-white rounded shadow p-6 m-4">
            <h1 className="text-2xl mb-6">Bienvenido, {user.email}</h1>
            <Link href="/admin/add">
              <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Añadir libro</p>
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
          <div className="bg-white rounded shadow p-6 m-4">
            <h1 className="text-2xl mb-6">You are not authenticated!</h1>
            <p className="mb-6">Please log in to access the dashboard.</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => router.push('/login')}>Log In</button>
          </div>
        )
      }
    </div>
  )
}
