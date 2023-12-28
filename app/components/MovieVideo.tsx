import prisma from '../utils/db';
import MovieButtons from './MovieButtons';

async function getData() {
  const data = await prisma.book.findFirst({
    select: {
      title: true,
      overview: true,
      videoSource: true,
      imageStrings: true,
      publicationYear: true,
      id: true,
      youtubeUrl: true,
    },
  });
  return data;
}

export default async function MovieVideo() {
  const data = await getData();

  return (
    <div className="h-[55vh] lg:h-[60vh] w-full flex justify-start items-center">
      <video
        poster={data?.imageStrings[0]}
        autoPlay
        muted
        loop
        src={data?.videoSource}
        className="w-full absolute top-0 left-0 h-[60vh] object-cover -z-10 brightness-[60%]"
      ></video>

      <div className="absolute w-[90%] lg:w-[40%] mx-auto">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          {data?.title}
        </h1>
        <p className="text-white text-lg mt-5 line-clamp-3">{data?.overview}</p>
        <div className="flex gap-x-3 mt-4">
          <MovieButtons
            id={data?.id as number}
            overview={data?.overview as string}
            publicationYear={data?.publicationYear as number}
            title={data?.title as string}
            youtubeUrl={data?.youtubeUrl as string}
            key={data?.id}
          />
        </div>
      </div>
    </div>
  );
}
