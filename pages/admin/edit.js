import { supabase } from '../../supabase'
import { useState } from 'react'

export default function EditBook() {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')

  const editBook = async () => {
    const { data, error } = await supabase
      .from('books')
      .update({ title })
      .eq('slug', slug)

    if (error) {
      console.error('Error: ', error)
    } else {
      console.log('Book updated successfully!')
    }
  }

  return (
    <div>
      <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="Slug of the book" />
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New title" />
      <button onClick={editBook}>Edit Book</button>
    </div>
  )
}
