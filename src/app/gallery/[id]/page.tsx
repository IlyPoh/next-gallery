'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ZoomLink from '@/components/ZoomLink';

import { getImageById } from '@/utils/helpers';
import { LoadingSkeletonForText } from '@/components/LoadingSkeletonForText';

export default function GalleryItemPage({
  params: { id },
}: {
  readonly params: { id: string };
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data } = useQuery({
    queryKey: ['image', id],
    queryFn: () => getImageById(id),
  });

  if (!data) return null;

  if ('error' in data)
    return (
      <div className='container mx-auto py-8'>
        <h1 className='text-center font-bold'>Image not found</h1>
      </div>
    );

  const { title, imageSrc } = data.image;

  return (
    <div className='container mx-auto py-8'>
      <div className='w-full flex items-center flex-col gap-4'>
        <div className='relative'>
          <Image
            alt={title}
            src={imageSrc}
            className={`${!imageLoaded && 'skeleton'} w-full h-auto rounded-xl`}
            width={1000}
            height={1000}
            priority
            quality={100}
            onLoad={() => setImageLoaded(true)}
          />
          {imageLoaded && <ZoomLink src={imageSrc} />}
        </div>
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='text-center font-bold'>
            <LoadingSkeletonForText loading={!imageLoaded}>
              {title}
            </LoadingSkeletonForText>
          </h1>
        </div>
      </div>
    </div>
  );
}
