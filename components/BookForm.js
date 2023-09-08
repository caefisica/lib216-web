import {useState} from 'react';
import {supabase} from '../supabase';

export default function BookForm({onNewBook}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {data, error} = await supabase
        .from('thelibrary')
        .insert([
          {title: title, author: author},
        ]);

    if (error) {
      console.error('Error adding book:', error);
      return;
    }

    if (data) {
      setTitle('');
      setAuthor('');
      onNewBook();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
      <button type="submit">Add Book</button>
    </form>
  );
}
