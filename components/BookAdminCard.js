import { useState } from 'react';
import { supabase } from '../supabase';

export default function BookAdminCard({ book, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase
      .from('thelibrary')
      .update({ title: title, author: author })
      .eq('id', book.id);

    if (error) {
      console.error('Error updating book:', error);
      return;
    }

    if (data) {
      setIsEditing(false);
      onEdit();
    }
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
