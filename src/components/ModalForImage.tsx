'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

import Modal from './Modal';
import ZoomLink from './ZoomLink';
import LoadingSpinner from './LoadingSpinner';

import { getImageById, getUser } from '@/utils/helpers';
import ImageOptions from './ImageOptions';

type TModalProps = Readonly<{
  id: string;
}>;

export default function ModalForImage({ id }: TModalProps) {
  const session = useSession();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data } = useQuery({
    queryKey: ['image', id],
    queryFn: () => getImageById(id),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
    enabled: !!session.data?.user,
  });

  const handleLoad = () => {
    setImageLoaded(true);
  };

  if (!data || 'error' in data) return null;

  const { image } = data.data;
  const { title, imageSrc } = image;
  const commonClasses = imageLoaded ? 'opacity-100' : 'opacity-0';

  return (
    <Modal navigation>
      {!imageLoaded && <LoadingSpinner />}
      <div
        className={`${commonClasses} flex flex-col items-center justify-center
        text-white text-center max-w-[1000px] relative transition-opacity
        duration-500`}
      >
        <Image
          alt={title}
          src={imageSrc}
          width={1000}
          height={1000}
          className='rounded-t-xl max-h-[80vh] w-auto'
          quality={100}
          priority
          onLoad={handleLoad}
        />
        {imageLoaded && (
          <>
            <ZoomLink src={imageSrc} />
            {userData &&
              !('error' in userData) &&
              userData?.data.user.id === image.userId && (
                <ImageOptions id={id} />
              )}
          </>
        )}
        <div className='flex flex-col text-center max-w-[1000px] w-full'>
          <h1 className='text-center font-bold m-4'>{title}</h1>
        </div>
      </div>
    </Modal>
  );
}
