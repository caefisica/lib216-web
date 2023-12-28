import Image from 'next/image';
import { auth } from '../utils/auth';
import prisma from '../utils/db';
import { MovieCard } from './MovieCard';

async function getData(userId: string) {
  const data = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      overview: true,
      youtubeUrl: true,
      publicationYear: true,
      imageStrings: true,
      WatchLists: {
        where: {
          userId: userId,
        },
      },
      Author: {
        select: {
          name: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 4,
  });

  return data.map(book => ({
    ...book,
    author: book.Author?.name ?? 'Unknown Author',
    category: book.category?.name ?? 'Uncategorized',
  }));
}

export default async function RecentlyAdded() {
  const session = await auth();
  const data = await getData(session?.user?.email as string);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
      {data.map((book) => (
        <div key={book.id} className="relative h-48">
          <Image
            src={book.imageStrings[0]}
            alt="Book"
            width={500}
            height={400}
            className="rounded-sm absolute w-full h-full object-cover"
          />

          <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
            <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center border">
              <Image
                src={book.imageStrings[0]}
                alt="Movie"
                width={800}
                height={800}
                className="absolute w-full h-full -z-10 rounded-lg object-cover"
              />

              <MovieCard
                bookId={book.id}
                overview={book.overview ?? 'No overview available'}
                title={book.title}
                watchListId={book.WatchLists[0]?.id ?? ''}
                watchList={book.WatchLists.length > 0}
                youtubeUrl={book.youtubeUrl ?? ''}
                publicationYear={book.publicationYear ?? 0}
                author={book.author ?? 'Unknown'}
                category={book.category ?? 'Uncategorized'}
                key={book.id}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
