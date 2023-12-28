'use client';

import { Button } from '@/components/ui/button';
import { InfoIcon, PlayCircle } from 'lucide-react';
import { useState } from 'react';
import PlayVideoModal from './PlayVideoModal';

interface iAppProps {
  overview: string;
  youtubeUrl: string;
  id: number;
  title: string;
  publicationYear: number;
}

export default function MovieButtons({
  id,
  overview,
  title,
  youtubeUrl,
  publicationYear,
}: iAppProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="text-lg font-medium">
        <PlayCircle className="mr-2 h-6 w-6" /> Leer
      </Button>
      <Button
        onClick={() => setOpen(true)}
        className="text-lg font-medium bg-white/40 hover:bg-white/30 text-white"
      >
        <InfoIcon className="mr-2 h-6 w-6" /> Saber más
      </Button>

      <PlayVideoModal
        state={open}
        changeState={setOpen}
        key={id}
        overview={overview}
        title={title}
        youtubeUrl={youtubeUrl}
        publicationYear={publicationYear}
      />
    </>
  );
}
