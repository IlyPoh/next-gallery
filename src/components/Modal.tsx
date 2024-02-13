'use client';

import { useRouter } from 'next/navigation';
import { type ElementRef, useRef } from 'react';

export default function Modal({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const overlay = useRef<ElementRef<'div'>>(null);
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === overlay.current) {
      closeModal();
    }
  };

  return (
    <div
      className='fixed overflow-hidden scroll-smooth inset-0 z-10 bg-opacity-70 backdrop-blur-sm bg-black flex items-center justify-center'
      onClick={handleClick}
      ref={overlay}
    >
      {children}
    </div>
  );
}
