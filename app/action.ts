'use server';

import { revalidatePath } from 'next/cache';
import { auth } from './utils/auth';
import prisma from './utils/db';

export async function addTowatchlist(formData: FormData) {
  'use server';

  const movieId = formData.get('movieId');
  const pathname = formData.get('pathname') as string;
  const session = await auth();

  // eslint-disable-next-line no-unused-vars
  const data = await prisma.watchList.create({
    data: {
      userId: session?.user?.email as string,
      movieId: Number(movieId),
    },
  });

  revalidatePath(pathname);
}

export async function deleteFromWatchlist(formData: FormData) {
  'use server';

  const watchlistId = formData.get('watchlistId') as string;
  const pathname = formData.get('pathname') as string;

  // eslint-disable-next-line no-unused-vars
  const data = await prisma.watchList.delete({
    where: {
      id: watchlistId,
    },
  });

  revalidatePath(pathname);
}

export const runtime = 'edge';
