'use client';

import { Button } from '@/components/ui/button';
import { Heart, PlayCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { addTowatchlist, deleteFromWatchlist } from '../action';
import PlayVideoModal from './PlayVideoModal';

interface iAppProps {
  title: string;
  overview: string;
  bookId: number;
  watchList: boolean;
  watchListId: string;
  youtubeUrl: string;
  publicationYear: number;
  author: string;
  category: string;
}

export function MovieCard({
  bookId,
  overview,
  title,
  watchListId,
  watchList,
  youtubeUrl,
  publicationYear,
  author,
  category,
}: iAppProps) {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  return (
    <>
      <button onClick={() => setOpen(true)} className="-mt-14">
        <PlayCircle className="h-20 w-20" />
      </button>

      <div className="right-5 top-5 absolute z-10">
        {watchList ? (
          <form action={deleteFromWatchlist}>
            <input type="hidden" name="watchListId" value={watchListId} />
            <input type="hidden" name="pathname" value={pathName} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4 text-red-500" />
            </Button>
          </form>
        ) : (
          <form action={addTowatchlist}>
              <input type="hidden" name="bookId" value={bookId} />
            <input type="hidden" name="pathname" value={pathName} />
            <Button variant="outline" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </form>
        )}
      </div>

      <div className="p-5 absolute bottom-0 left-0">
        <h1 className="font-bold text-lg line-clamp-1">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-normal text-sm">{author}</p>
          <p className="font-normal text-sm">{publicationYear}</p>
          <p className="font-normal border py-0.5 px-1 border-gray-200 rounded text-sm">
            {category}
          </p>
        </div>
        <p className="line-clamp-1 text-sm text-gray-200 font-light">
          {overview}
        </p>
      </div>

      <PlayVideoModal
        youtubeUrl={youtubeUrl}
        key={bookId}
        title={title}
        overview={overview}
        state={open}
        changeState={setOpen}
        publicationYear={publicationYear}
      />
    </>
  );
}
