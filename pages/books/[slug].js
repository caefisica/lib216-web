import { supabase } from '../../supabase'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Book({ book }) {
  const router = useRouter()

  // Add any additional functionality as required
  return (
    <div className="flex h-screen flex-col justify-between">
      <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto flex flex-col sm:flex-row">
          {/* Add book image here if available */}
          <div className="w-full sm:w-1/2">
            <Image 
              src={`/images${book.image_url}`}
              alt={book.title}
              layout="responsive"
              width={500}
              height={750}
            />
          </div>
          <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10 sm:w-1/2">
            <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
              {book.title}
            </h1>
            <h2 className="mt-3 text-lg font-bold text-gray-500 sm:text-xl sm:tracking-tight lg:text-xl">
              By: {book.author}
            </h2>
            <h3 className="mt-1 text-lg text-gray-500 sm:text-xl sm:tracking-tight lg:text-xl">
              Category: {book.category}
            </h3>
            <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
              Description
            </div>
            <p className="max-w-xl">{book.description}</p>
          </div>
        </div>
        <div className="mt-8">
        <Link href="/" passHref>
          <p className="text-blue-500 hover:underline cursor-pointer">← Back to home</p>
        </Link>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const { data: book, error } = await supabase
    .from('thelibrary')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error) console.error('Error: ', error)

  return {
    props: {
      book,
    },
  }
}

export async function getStaticPaths() {
  const { data: books, error } = await supabase
    .from('thelibrary')
    .select('slug')

  const paths = books.map((book) => ({
    params: { slug: book.slug },
  }))

  return { paths, fallback: false }
}
