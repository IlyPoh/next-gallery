'use client';

import { useQuery } from '@tanstack/react-query';

import GalleryItem from './GalleryItem';

import { getImages } from '@/utils/helpers';

export default function ImagesGallery({
  searchParams: { page, search },
}: {
  readonly searchParams: { page: string; search: string };
}) {
  const currentPage = Number(page) || 1;

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['images', currentPage, search],
    queryFn: () => getImages({ page: currentPage, search: search }),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  if (!data) return null;

  const { images } = data;

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {images.length !== 0 ? (
        <section
          className={`${
            isLoading ? 'skeleton' : ''
          } rounded-xl grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-6`}
        >
          {images.map(image => (
            <GalleryItem image={image} key={image.title} />
          ))}
        </section>
      ) : (
        <div className='text-center font-bold text-4xl'>No images found</div>
      )}
    </>
  );
}
