import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function BookCard({ book }) {
  const [isLoading, setLoading] = useState(true)

  function cn(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Link href="/books/[slug]" as={`/books/${book.slug}`}>
      <div className="group cursor-pointer">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            alt={book.title}
            src={`/images${book.image_url}`}
            className={cn(
              'duration-700 ease-in-out group-hover:opacity-75',
              isLoading
                ? 'scale-110 blur-2xl grayscale'
                : 'scale-100 blur-0 grayscale-0'
            )}
            onLoadingComplete={() => setLoading(false)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            width={500}  // Provide appropriate width
            height={300}  // Provide appropriate height
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>
        <p className="mt-1 text-sm italic text-gray-500">{book.category}</p>
      </div>
    </Link>
  )
}
