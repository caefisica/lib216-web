'use server';

import { auth } from '@/app/utils/auth';
import prisma from '@/app/utils/db';
import { revalidatePath } from 'next/cache';

export async function addTowatchlist(formData: FormData) {
  'use server';

  const bookId = formData.get('bookId');
  const pathname = formData.get('pathname') as string;
  const session = await auth();

  // eslint-disable-next-line no-unused-vars
  const data = await prisma.watchList.create({
    data: {
      userId: session?.user?.email as string,
      bookId: Number(bookId),
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
