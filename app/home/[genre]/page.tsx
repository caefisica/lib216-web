import { MovieCard } from '@/app/components/MovieCard';
import { auth } from '@/app/utils/auth';
import prisma from '@/app/utils/db';
import Image from 'next/image';

async function getData(category: string, userId: string) {
  let query = {
    where: {
      category: { name: category },
    },
    select: {
      id: true,
      title: true,
      overview: true,
      publicationYear: true,
      imageStrings: true,
      youtubeUrl: true,
      author: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      watchLists: {
        where: {
          userId: userId,
        },
      },
    },
  };

  switch (category) {
    case 'Mecánica Cuántica':
    case 'Electromagnetismo':
    case 'Termodinámica y Física Estadística':
    case 'Mecánica Clásica':
      return await prisma.book.findMany(query);
    default:
      return [];
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { genre: string };
}) {
  const session = await auth();
  const data = await getData(params.genre, session?.user?.email as string);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
      {data.map((book) => (
        <div key={book.id} className="relative h-60">
          <Image
            src={book.imageStrings[0]}
            alt="Book"
            width={500}
            height={400}
            className="rounded-sm absolute w-full h-full object-cover"
          />
          <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
              <Image
                src={book.imageStrings[0]}
                alt="Book"
                width={800}
                height={800}
                className="absolute w-full h-full -z-10 rounded-lg object-cover"
              />

              <MovieCard
                bookId={book.id}
                overview={book.overview ?? 'No overview available'}
                title={book.title}
                watchListId={book.watchLists[0]?.id ?? ''}
                watchList={book.watchLists.length > 0}
                youtubeUrl={book.youtubeUrl ?? ''}
                publicationYear={book.publicationYear ?? 0}
                author={book.author?.name ?? 'Unknown'}
                category={book.category?.name ?? 'Uncategorized'}
                key={book.id}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const runtime = 'edge';
