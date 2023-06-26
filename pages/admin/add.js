import { supabase } from '../../supabase'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// For toast notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddBook() {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [published, setPublished] = useState(false)
  const [image_url, setImageUrl] = useState('')
  const router = useRouter()

  const addBook = async () => {
    const { data, error } = await supabase
      .from('thelibrary')
      .insert([{ slug, title, author, category, description, published, image_url }])

    if (error) {
      toast.error('Error adding book');
    } else {
      toast.success('Book added successfully!');
      router.push('/dashboard');
    }
  }

  return (
    <div className="flex flex-col justify-between min-h-screen py-12 bg-gray-100">
      <ToastContainer />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold mb-6">Agregar libro</h1>
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addBook}>Agregar</button>
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
