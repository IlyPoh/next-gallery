'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import ZoomLink from '@/components/ZoomLink';

import { getImageById, getUser } from '@/utils/helpers';
import { LoadingSkeletonForText } from '@/components/LoadingSkeletonForText';
import ImageOptions from '@/components/ImageOptions';

export default function GalleryItemPage({
  params: { id },
}: {
  readonly params: { id: string };
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data: imageData } = useQuery({
    queryKey: ['image', id],
    queryFn: () => getImageById(id),
  });
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  if (!imageData) return null;

  if ('error' in imageData)
    return (
      <div className='container py-8'>
        <h1 className='font-bold text-center'>Image not found</h1>
      </div>
    );

  const { userId, title, imageSrc } = imageData.image;

  return (
    <div className='container py-8'>
      <div className='flex flex-col items-center w-full gap-4'>
        <div className='relative'>
          <Image
            alt={title}
            src={imageSrc}
            className={`${!imageLoaded && 'skeleton'} w-full h-auto rounded-xl`}
            width={2000}
            height={2000}
            priority
            quality={100}
            onLoad={() => setImageLoaded(true)}
          />
          {imageLoaded && <ZoomLink src={imageSrc} />}
          {imageLoaded &&
            userData &&
            !('error' in userData) &&
            userData?.user.id === userId && <ImageOptions id={id} />}
        </div>
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='font-bold text-center'>
            <LoadingSkeletonForText loading={!imageLoaded}>
              {title}
            </LoadingSkeletonForText>
          </h1>
        </div>
      </div>
    </div>
  );
}
