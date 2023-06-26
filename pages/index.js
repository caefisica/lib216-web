import { supabase } from '../supabase'
import { useEffect, useState, useRef } from 'react'
import ProductCard from '../components/BookCard'
import Header from '../components/Header'

export default function Gallery() {
  const [books, setBooks] = useState([])
  const libraryRef = useRef(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    let { data: books, error } = await supabase
      .from('thelibrary')
      .select('*')

    if (error) console.log('Error: ', error)
    else setBooks(books)
  }

  const scrollHandler = () => {
    libraryRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="flex flex-col h-full py-12">
      <Header scrollHandler={scrollHandler} />
      <div ref={libraryRef} className="max-w-2xl m-auto p-4 sm:p-6 lg:p-8 flex-grow flex flex-col">
        <div className="text-center flex-grow">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Libros</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 flex-grow">
          {books.map((book) => (
            <ProductCard book={book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
