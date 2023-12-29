'use server';

import { auth } from '@/app/utils/auth';
import prisma from '@/app/utils/db';
import { revalidatePath } from 'next/cache';

export async function addTowatchlist(formData: FormData) {
  'use server';

  const bookId = formData.get('bookId');
  const pathname = formData.get('pathname') as string;
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    throw new Error('Session not found or invalid user in session.');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  // eslint-disable-next-line no-unused-vars
  const data = await prisma.watchList.create({
    data: {
      userId: user.id,
      bookId: Number(bookId),
    },
  });

  revalidatePath(pathname);
}

export async function deleteFromWatchlist(formData: FormData) {
  'use server';

  const watchlistId = formData.get('watchListId') as string;
  const pathname = formData.get('pathname') as string;

  // eslint-disable-next-line no-unused-vars
  const data = await prisma.watchList.delete({
    where: {
      id: watchlistId,
    },
  });

  revalidatePath(pathname);
}
