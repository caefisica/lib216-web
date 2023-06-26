import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ImageUploader from './ImageUploader';

// For toast notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditBook() {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [published, setPublished] = useState(false)
  const [image_url, setImageUrl] = useState('')
  const [initialBook, setInitialBook] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if(router.query.slug) {
      setSlug(router.query.slug)
      fetchBook(router.query.slug)
    }
  }, [router.query.slug])

  const fetchBook = async (slug) => {
    const { data: books, error } = await supabase
      .from('thelibrary')
      .select('*')
      .eq('slug', slug)
  
    if (error) {
      toast.error('Error fetching book details');
    } else if (books.length) {
      const book = books[0]
      setTitle(book.title)
      setAuthor(book.author)
      setCategory(book.category)
      setDescription(book.description)
      setPublished(book.published)
      setImageUrl(book.image_url)
      setInitialBook(book)
    }
  }  

  const getUpdatedFields = () => {
    let fields = {}
    if (initialBook.title !== title) fields.title = title
    if (initialBook.author !== author) fields.author = author
    if (initialBook.category !== category) fields.category = category
    if (initialBook.description !== description) fields.description = description
    if (initialBook.published !== published) fields.published = published
    if (initialBook.image_url !== image_url) fields.image_url = image_url
    return fields
  }

  const editBook = async () => {
    const updatedFields = getUpdatedFields()

    const { data, error } = await supabase
      .from('thelibrary')
      .update(updatedFields)
      .eq('slug', slug)
      .select('*')
    
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
  }

  return (
    <div className="flex flex-col h-full py-12">
      <ToastContainer />
      <div className="max-w-2xl m-auto p-4 sm:p-6 lg:p-8 flex-grow flex flex-col">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Editar libro</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 flex-grow">
          <input
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={slug}
            readOnly
            placeholder="Slug del libro"
          />
          <input
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título del nuevo libro"
          />
          <input
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            placeholder="Autor"
          />
          <input
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Categoría"
          />
          <textarea
            className="border-2 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descripción"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={published}
              onChange={e => setPublished(e.target.checked)}
            />
            <label className="ml-2 text-gray-700">Publicado</label>
          </div>
          {initialBook && <ImageUploader initialImage={initialBook.image_url} onImageUpload={setImageUrl} />}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={editBook}
          >
            Guardar
          </button>
          <Link href="/dashboard">
            <p className="text-blue-500 hover:text-blue-700 underline">Regresar al Editor</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
