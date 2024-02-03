import Link from 'next/link';

export default function zoomLink({ src }: { src: string }) {
  return (
    <Link
      href={src}
      className='absolute top-2 left-2 bg-black bg-opacity-50 p-2 flex items-center justify-center rounded-xl hover:bg-opacity-90 transition-colors duration-300 ease-in-out modal-link'
      target='_blank'
    >
      <i className='icon-search'></i>
    </Link>
  );
}
