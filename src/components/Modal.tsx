'use client';

import { useRouter } from 'next/navigation';
import { type ElementRef, useRef } from 'react';

export default function Modal({
  children,
  navigation = false,
}: {
  readonly children: React.ReactNode;
  readonly navigation?: boolean | (() => void);
}) {
  const overlay = useRef<ElementRef<'div'>>(null);
  const router = useRouter();

  const closeModal = () => {
    if (navigation) {
      if (typeof navigation === 'function') {
        navigation();
      } else {
        router.back();
      }
    }
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
      <div className='bg-black bg-opacity-60 modal rounded-xl'>{children}</div>
    </div>
  );
}
