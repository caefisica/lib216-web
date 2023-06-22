import { supabase } from '../supabase'
import { useEffect, useState, useRef } from 'react'  // Added useRef
import ProductCard from '../components/BookCard'
import Header from '../components/Header'

export default function Gallery() {
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])

  const libraryRef = useRef(null)

  useEffect(() => {
    fetchBooks()
    fetchCategories()
  }, [])

  const fetchBooks = async () => {
    let { data: books, error } = await supabase
      .from('thelibrary')
      .select('*')

    if (error) console.log('Error: ', error)
    else setBooks(books)
  }

  const fetchCategories = async () => {
    let { data: categories, error } = await supabase
      .from('categories')
      .select('*')

    if (error) console.log('Error: ', error)
    else setCategories(categories)
  }

  // Added scrollHandler function
  const scrollHandler = () => {
    libraryRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <Header categories={categories} scrollHandler={scrollHandler} />
      <div ref={libraryRef} className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p
              className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl"
            >
              Libros
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {books.map((book) => (
          <ProductCard book={book} key={book.id} />
        ))}
        </div>
      </div>
    </>
  )
}
