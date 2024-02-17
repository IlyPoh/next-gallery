import Pagination from '@/components/Pagination';
import ImagesGallery from '@/components/ImagesGallery';
import SearchComponent from '@/components/SearchComponent';

export default async function GalleryPage({
  searchParams,
}: {
  readonly searchParams: { page: string; search: string };
}) {
  return (
    <div className='container mx-auto px-2'>
      <section className='relative flex items-center justify-center overflow-hidden mb-6'>
        <h1 className='text-center'>Gallery</h1>
        <SearchComponent />
      </section>

      <ImagesGallery searchParams={searchParams} />

      <Pagination searchParams={searchParams} />
    </div>
  );
}
