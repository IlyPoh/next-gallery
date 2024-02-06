'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

import { TImage } from '@/types';

export default function GalleryItem({ image }: { readonly image: TImage }) {
  const [loading, setLoading] = useState(true);
  const { id, title, imageSrc } = image;

  return (
    <Link
      key={id}
      className='overflow-hidden rounded-xl aspect-video w-full relative group/galleryItem'
      href={`/gallery/${id}`}
      scroll={false}
    >
      <Image
        alt={title}
        src={imageSrc}
        className={`${
          loading ? 'skeleton' : ''
        } rounded-xl w-full aspect-video object-cover object-center hover:scale-105 duration-500 ease-in-out`}
        width={500}
        height={500}
        priority={false}
        onLoad={() => setLoading(false)}
      />
      <div className='absolute bottom-0 inset-x-0 bg-black bg-opacity-40 backdrop-blur-sm py-2 px-4 opacity-0 group-hover/galleryItem:opacity-100 transition-opacity duration-500 text-center'>
        {title}
      </div>
    </Link>
  );
}
