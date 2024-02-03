'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import ZoomLink from '@/components/ZoomLink';

import { TImage } from '@/types';

type TModalProps = {
  readonly image: TImage;
};

export default function Modal({ image }: TModalProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    router.back();
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlay.current) {
      closeModal();
    }
  };

  const handleImageLoad = () => {
    setIsOpen(true);
  };

  const { title, imageSrc } = image;

  return (
    <div
      className='fixed overflow-hidden scroll-smooth inset-0 z-10 bg-opacity-70 backdrop-blur-sm bg-black flex items-center justify-center'
      onClick={handleClick}
      ref={overlay}
    >
      <div
        className={`${
          isOpen ? 'flex' : 'hidden'
        } flex-col rounded-xl items-center justify-center backdrop-blur-md text-white text-center mx-2 max-w-[1000px] modal relative`}
      >
        <Image
          alt={title}
          src={imageSrc}
          width={1000}
          height={1000}
          className='rounded-t-xl max-h-[80vh] w-auto'
          quality={100}
          priority
          onLoad={handleImageLoad}
        />
        <ZoomLink src={imageSrc} />
        <div className='flex flex-col text-center max-w-[1000px] w-full'>
          <h1 className='text-center font-bold m-4'>{title}</h1>
        </div>
      </div>
    </div>
  );
}
