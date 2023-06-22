import { supabase } from '../../supabase'
import { useState } from 'react'

export default function AddBook() {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')

  const addBook = async () => {
    const { data, error } = await supabase
      .from('books')
      .insert([{ slug, title }])

    if (error) {
      console.error('Error: ', error)
    } else {
      console.log('Book added successfully!')
    }
  }

  return (
    <div>
      <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug of the book" />
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <button onClick={addBook}>Add Book</button>
    </div>
  )
}
