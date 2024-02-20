'use client';
import Image from 'next/image';
import { ElementRef, useRef, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function HeaderProfile() {
  const { data: session } = useSession();
  const popup = useRef<ElementRef<'div'>>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleClick = () => {
    setPopupOpen(prev => !prev);
  };

  const renderPopup = () => (
    <div
      className={`${
        popupOpen ? '' : 'opacity-0'
      } absolute left-0 right-0 -bottom-8 whitespace-nowrap transition-opacity duration-300 ease`}
      ref={popup}
    >
      <button
        className='px-4 py-2 text-center transition-all duration-300 bg-black border-2 header-profile-button border-primary rounded-3xl shadow-primary shadow-pink-500 ease'
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );

  const renderProfile = () => (
    <div
      className='relative flex items-center cursor-pointer'
      onClick={handleClick}
    >
      <div className='mr-4'>{session?.user?.name}</div>
      <Image
        className='size-10 border-2 rounded-full border-primary'
        src={`${session?.user?.image}`}
        width={50}
        height={50}
        alt='User Image'
      />
      {renderPopup()}
    </div>
  );

  return (
    <div className='flex items-center order-2 w-[50%] justify-end sm:order-3 sm:w-[unset]'>
      {session ? (
        renderProfile()
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  );
}
