import { supabase } from '../supabase'
import { useEffect, useState } from 'react'
import BookForm from '../components/BookForm'
import BookAdminCard from '../components/BookAdminCard'
import { useUser } from '../utils/useUser'

export default function Admin() {
  const [books, setBooks] = useState([])
  const { user, session } = useUser()

  useEffect(() => {
    if(user) fetchBooks()
  }, [user])

  const fetchBooks = async () => {
    let { data: books, error } = await supabase
      .from('thelibrary')
      .select('*')

    if (error) console.log('Error: ', error)
    else setBooks(books)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <BookForm onNewBook={fetchBooks} />
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {books.map((book) => (
        <BookAdminCard book={book} key={book.id} onEdit={fetchBooks} />
      ))}
      </div>
    </div>
  )
}
