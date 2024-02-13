'use client';
import Image from 'next/image';
import { ElementRef, useRef, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function HeaderProfile() {
  const { data: session } = useSession();
  const popup = useRef<ElementRef<'div'>>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleClick = () => {
    setPopupOpen(!popupOpen);
  };

  const renderPopup = () => (
    <div
      className={`${
        popupOpen ? '' : 'opacity-0'
      } absolute left-0 right-0 -bottom-8 whitespace-nowrap transition-opacity duration-300 ease`}
      ref={popup}
    >
      <button
        className='header-profile-button py-2 px-4 bg-black border-primary border-2 text-center rounded-3xl shadow-primary shadow-pink-500 transition-all duration-300 ease'
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );

  const renderProfile = () => (
    <div
      className='flex items-center relative cursor-pointer'
      onClick={handleClick}
    >
      <div className='mr-4'>{session?.user?.name}</div>
      <Image
        className='rounded-full w-10 h-10 border-primary border-2'
        src={`${session?.user?.image}`}
        width={50}
        height={50}
        alt='User Image'
      />
      {renderPopup()}
    </div>
  );

  return (
    <div className='flex items-center order-2 sm:order-3'>
      {session ? (
        renderProfile()
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  );
}
