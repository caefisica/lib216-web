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
      setImageUrl(book.image_url);
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white shadow rounded-lg">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8">Editar libro</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-6 mb-4">
          <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <label htmlFor="published" className="ml-2 block text-lg text-gray-700">
                Publicado
              </label>
            </div>

            <div>
              <label htmlFor="slug" className="block text-lg font-medium text-gray-700 mb-1">
                Slug del libro
              </label>
              <input
                id="slug"
                type="text"
                className="bg-gray-100 border border-gray-300 text-gray-700 text-lg rounded-lg block w-full p-3"
                value={slug}
                readOnly
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">
                Título del libro
              </label>
              <input
                id="title"
                type="text"
                className="border border-gray-300 text-lg rounded-lg block w-full p-3 focus:ring-blue-500 focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-lg font-medium text-gray-700 mb-1">
                Autor
              </label>
              <input
                id="author"
                type="text"
                className="border border-gray-300 text-lg rounded-lg block w-full p-3 focus:ring-blue-500 focus:border-blue-500"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-1">
                Categoría
              </label>
              <input
                id="category"
                type="text"
                className="border border-gray-300 text-lg rounded-lg block w-full p-3 focus:ring-blue-500 focus:border-blue-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="description"
                rows="4"
                className="border border-gray-300 text-lg rounded-lg block w-full p-3 focus:ring-blue-500 focus:border-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {initialBook && <ImageUploader initialImage={initialBook.image_url} onImageUpload={setImageUrl} />}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={editBook}
            >
              Guardar
            </button>
            <Link 
              href="/dashboard"
              className="text-lg text-blue-600 hover:text-blue-700 hover:underline"
            >
              Regresar a la lista de libros
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
