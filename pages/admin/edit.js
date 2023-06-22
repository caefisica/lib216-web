import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'
import { useRouter } from 'next/router'

export default function EditBook() {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [published, setPublished] = useState(false)
  const [image_url, setImageUrl] = useState('')
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

    if (error) console.error('Error: ', error)
    else if (books.length) {
      const book = books[0]
      setTitle(book.title)
      setAuthor(book.author)
      setCategory(book.category)
      setDescription(book.description)
      setPublished(book.published)
      setImageUrl(book.image_url)
    }
  }

  const editBook = async () => {
    const { data, error } = await supabase
      .from('thelibrary')
      .update({ 
        title, 
        author,
        category,
        description,
        published,
        image_url 
      })
      .eq('slug', slug)

    if (error) {
      console.error('Error: ', error)
    } else {
      console.log('Book updated successfully!')
      router.push('/dashboard')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Editar libro</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input className="border p-2 rounded" value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug of the book" />
        <input className="border p-2 rounded" value={title} onChange={e => setTitle(e.target.value)} placeholder="New title" />
        <input className="border p-2 rounded" value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" />
        <input className="border p-2 rounded" value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
        <textarea className="border p-2 rounded" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
        <div className="flex items-center">
          <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
          <label className="ml-2">Publicado</label>
        </div>
        <input className="border p-2 rounded" value={image_url} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={editBook}>Editar libro</button>
    </div>
  )
}
