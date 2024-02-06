'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import ZoomLink from './ZoomLink';
import LoadingSpinner from './LoadingSpinner';

import { getImageById } from '@/utils/helpers';

type TModalProps = Readonly<{
  id: string;
}>;

export default function Modal({ id }: TModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data: image } = useQuery({
    queryKey: ['image', id],
    queryFn: () => getImageById(id),
  });

  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlay.current) {
      closeModal();
    }
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  if (!image) return null;

  const { title, imageSrc } = image;

  return (
    <div
      className='fixed overflow-hidden scroll-smooth inset-0 z-10 bg-opacity-70 backdrop-blur-sm bg-black flex items-center justify-center'
      onClick={handleClick}
      ref={overlay}
    >
      {!imageLoaded && <LoadingSpinner />}
      <div
        className={`${
          imageLoaded ? 'flex' : 'hidden'
        } flex flex-col rounded-xl items-center justify-center backdrop-blur-md text-white text-center mx-2 max-w-[1000px] modal relative`}
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
    </div>
  );
}
