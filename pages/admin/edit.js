import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import Link from 'next/link'

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
      router.push('/dashboard');
    } else {
      toast.info('Ningún cambio detectado.');
    }
  }

  return (
    <div className="flex flex-col justify-between min-h-screen py-12 bg-gray-100">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-6">Editar libro</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <input className="border p-2 rounded" value={slug} readOnly placeholder="Slug del libro" />
          <input className="border p-2 rounded" value={title} onChange={e => setTitle(e.target.value)} placeholder="Título del nuevo libro" />
          <input className="border p-2 rounded" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Autor" />
          <input className="border p-2 rounded" value={category} onChange={e => setCategory(e.target.value)} placeholder="Categoría" />
          <textarea className="border p-2 rounded" value={description} onChange={e => setDescription(e.target.value)} placeholder="Descripción" />
          <div className="flex items-center">
            <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
            <label className="ml-2">Publicado</label>
          </div>
          <input className="border p-2 rounded" value={image_url} onChange={e => setImageUrl(e.target.value)} placeholder="URL de la portada" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={editBook}>Guardar</button>
          <Link href="/dashboard">
            <p className="text-blue-500 hover:text-blue-700">Regresar al Editor</p>
          </Link>
        </div>
      </div>
      <footer className="text-center py-6">
        <p>© 2023 CAE-Física. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
