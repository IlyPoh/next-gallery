'use client';
import Image from 'next/image';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Modal from './Modal';
import ZoomLink from './ZoomLink';
import LoadingSpinner from './LoadingSpinner';

import { getImageById, getUser } from '@/utils/helpers';

type TModalProps = Readonly<{
  id: string;
}>;

export default function ModalForImage({ id }: TModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data } = useQuery({
    queryKey: ['image', id],
    queryFn: () => getImageById(id),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
  const { data: userData } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUser(),
  });

  if (!userData || 'error' in userData) return null;

  const handleLoad = () => {
    setImageLoaded(true);
  };

  if (!data || 'error' in data) return null;

  const { image } = data;
  const { title, imageSrc } = image;

  return (
    <Modal>
      {!imageLoaded && <LoadingSpinner />}
      <div
        className={`${
          imageLoaded ? 'flex' : 'opacity-0'
        } flex flex-col rounded-xl items-center justify-center backdrop-blur-md text-white text-center mx-2 max-w-[1000px] modal relative transition-opacity duration-500`}
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
        {imageLoaded && <ZoomLink src={imageSrc} />}
        <div className='flex flex-col text-center max-w-[1000px] w-full'>
          <h1 className='text-center font-bold m-4'>{title}</h1>
        </div>
      </div>
    </Modal>
  );
}
