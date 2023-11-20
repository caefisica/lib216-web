import {useEffect, useState} from 'react';
import {supabase} from '../../supabase';
import {useRouter} from 'next/router';
import Link from 'next/link';
import ImageUploader from './ImageUploader';

// For toast notifications
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * EditBook component to edit details of a book.
 * @return {JSX.Element} The rendered component.
 */
export default function EditBook() {
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [initialBook, setInitialBook] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.slug) {
      setSlug(router.query.slug);
      fetchBook(router.query.slug);
    }
  }, [router.query.slug]);

  const fetchBook = async (slug) => {
    const {data: books, error} = await supabase
        .from('thelibrary')
        .select('*')
        .eq('slug', slug);

    if (error) {
      toast.error('Error fetching book details');
    } else if (books.length) {
      const book = books[0];
      setTitle(book.title);
      setAuthor(book.author);
      setCategory(book.category);
      setDescription(book.description);
      setPublished(book.published);
      setImageUrl(book.imageUrl);
      setInitialBook(book);
    }
  };

  const getUpdatedFields = () => {
    const fields = {};
    if (initialBook.title !== title) fields.title = title;
    if (initialBook.author !== author) fields.author = author;
    if (initialBook.category !== category) fields.category = category;
    if (initialBook.description !== description) fields.description = description;
    if (initialBook.published !== published) fields.published = published;
    if (initialBook.imageUrl !== imageUrl) fields.imageUrl = imageUrl;
    return fields;
  };

  const editBook = async () => {
    const updatedFields = getUpdatedFields();

    const {data, error} = await supabase
        .from('thelibrary')
        .update(updatedFields)
        .eq('slug', slug)
        .select('*');

    if (error) {
      toast.error('Hubo un error al actualizar el libro.');
    } else if (data) {
      toast.success('¡Se actualizó el libro!');
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } else {
      toast.info('Ningún cambio detectado.');
    }
  };

  return (
    <div className="flex flex-col h-full py-12">
      <ToastContainer />
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 flex-grow">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Editar libro</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">
              Slug del libro
            </label>
            <input
              id="slug"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 w-full"
              value={slug}
              readOnly
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Título del nuevo libro
            </label>
            <input
              id="title"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
              Autor
            </label>
            <input
              id="author"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 w-full"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              Categoría
            </label>
            <input
              id="category"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Descripción
            </label>
            <textarea
              id="description"
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center md:col-span-2">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <label htmlFor="published" className="ml-2 text-gray-700">
              Publicado
            </label>
          </div>
          {initialBook && <ImageUploader initialImage={initialBook.imageUrl} onImageUpload={setImageUrl} />}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={editBook}
          >
            Guardar
          </button>
          <Link className="text-blue-500 hover:text-blue-700 underline" href="/dashboard">
            Regresar a la lista de libros
          </Link>
        </div>
      </div>
    </div>
  );
}
