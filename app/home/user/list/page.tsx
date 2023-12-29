import { MovieCard } from '@/app/components/MovieCard';
import { auth } from '@/app/utils/auth';
import prisma from '@/app/utils/db';
import Image from 'next/image';

async function getUserId(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  return user ? user.id : null;
}

async function getData(userId: string) {
  const data = await prisma.watchList.findMany({
    where: {
      userId: userId,
    },
    select: {
      book: {
        select: {
          id: true,
          title: true,
          language: true,
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
          watchLists: true,
        },
      },
    },
  });

  return data;
}

export default async function Watchlist() {
  const session = await auth();
  const userId = await getUserId(session?.user?.email as string);
  const data = await getData(userId as string);

  return (
    <>
      <h1 className="text-white text-4xl font-bold mt-10 px-5 sm:px-0">
        Mi Lista de Lectura
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-10 gap-6">
        {data.map((watchListItem) => (
          <div key={watchListItem.book?.id} className="relative h-60">
            <Image
              src={watchListItem.book?.imageStrings[0] as string}
              alt="Movie"
              width={500}
              height={400}
              className="rounded-sm absolute w-full h-full object-cover"
            />
            <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
              <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                <Image
                  src={watchListItem.book?.imageStrings[0] as string}
                  alt="Book"
                  width={800}
                  height={800}
                  className="absolute w-full h-full -z-10 rounded-lg object-cover"
                />

                <MovieCard
                  bookId={watchListItem.book?.id as number}
                  overview={
                    watchListItem.book?.overview ?? 'No overview available'
                  }
                  title={watchListItem.book?.title as string}
                  watchListId={watchListItem.book?.watchLists[0]?.id ?? ''}
                  watchList={
                    (watchListItem.book?.watchLists.length as number) > 0
                      ? true
                      : false
                  }
                  youtubeUrl={watchListItem.book?.youtubeUrl ?? ''}
                  publicationYear={watchListItem.book?.publicationYear ?? 0}
                  author={watchListItem.book?.author.name ?? 'Unknown'}
                  category={
                    watchListItem.book?.category?.name ?? 'Uncategorized'
                  }
                  key={watchListItem.book?.id}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export const runtime = 'edge';
