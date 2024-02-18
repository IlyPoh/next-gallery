import AddImage from './AddImage';
import SearchComponent from './SearchComponent';

export default function GalleryHeader() {
  return (
    <section className='relative flex items-center justify-center overflow-hidden mb-6'>
      <h1 className='text-center'>Gallery</h1>
      <SearchComponent />
      <AddImage />
    </section>
  );
}
