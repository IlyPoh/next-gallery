import Link from 'next/link';

export default function ZoomLink({ src }: { readonly src: string }) {
  return (
    <Link
      href={src}
      className='absolute flex p-2 transition-colors duration-300 ease-in-out bg-black bg-opacity-50 group top-2 left-2 rounded-xl hover:bg-opacity-90 link-shadow'
      target='_blank'
      title='Open full image'
    >
      <i className='icon-search group-hover:scale-[1.15] transition-transform duration-300 ease-in-out'></i>
    </Link>
  );
}
