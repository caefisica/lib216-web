import {supabase} from '../../supabase';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import ImageUploader from './ImageUploader';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Component to add a book.
 * @return {JSX.Element} Rendered component.
 */
export default function AddBook() {
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState(''); // camelCased this
  const router = useRouter();

  const addBook = async () => {
    const {error} = await supabase // Removed data as it's unused
        .from('thelibrary')
        .insert([{slug, title, author, category, description, published, imageUrl}]);

    if (error) {
      toast.error('Error adding book');
    } else {
      toast.success('Book added successfully!');
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col h-full py-12">
      <ToastContainer />
      <div className="max-w-2xl m-auto p-4 sm:p-6 lg:p-8 flex-grow flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Agregar libro</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 flex-grow">
          <input
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug del libro"
          />
          <input
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título del nuevo libro"
          />
          <input
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Autor"
          />
          <input
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Categoría"
          />
          <textarea
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <label className="ml-2 text-gray-700">Publicado</label>
          </div>
          <ImageUploader onImageUpload={setImageUrl} />
        </div>
        <div className="flex items-center justify-between mt-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addBook}
          >
            Agregar
          </button>
          <Link href="/dashboard">
            <p className="text-blue-500 hover:text-blue-700 underline">Regresar al Editor</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
