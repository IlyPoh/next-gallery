import SearchComponent from '@/components/SearchComponent';
import Pagination from '@/components/Pagination';
import GalleryItem from '@/components/GalleryItem';

import { getImages } from '@/utils/helpers';

export default async function GalleryPage({
  searchParams: { page, search },
}: {
  readonly searchParams: { page: string; search: string };
}) {
  const currentPage = Number(page) || 1;
  const { images, totalPages } = await getImages({
    page: currentPage,
    search: search,
  });

  return (
    <div className='container mx-auto px-2'>
      <div className='relative flex items-center justify-center overflow-hidden mb-6'>
        <h1 className='text-center'>Gallery</h1>
        <SearchComponent />
      </div>
      {images.length !== 0 ? (
        <section className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-6'>
          {images.map(image => GalleryItem(image))}
        </section>
      ) : (
        <div className='text-center font-bold text-4xl'>No images found</div>
      )}
      <section className='flex items-center justify-center mb-6 gap-4 font-bold'>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </section>
    </div>
  );
}
