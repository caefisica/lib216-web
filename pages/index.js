import {supabase} from '../supabase';
import {useEffect, useState, useRef} from 'react';
import BookCard from '../components/BookCard';
import Header from '../components/Header';

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const {data, error} = await supabase.from('thelibrary').select('*');
        if (error) throw error;
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return {books, loading, error};
};

export default function Gallery() {
  const {books, loading, error} = useBooks();
  const libraryRef = useRef(null);

  const scrollHandler = () => {
    libraryRef.current.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="flex flex-col h-full py-12">
      <Header scrollHandler={scrollHandler} />
      <div ref={libraryRef} className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-gray-800 mb-6">Libros</h1>
          {loading && <p>Cargando libros...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
        </div>
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {books.map((book) => (
              <BookCard book={book} key={book.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
