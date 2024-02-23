"use client";
import Image from "next/image";
import { ElementRef, useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function HeaderProfile() {
  const { data: session } = useSession();
  const popup = useRef<ElementRef<"div">>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleClick = () => {
    setPopupOpen((prev) => !prev);
  };

  const renderPopup = () => (
    <div
      className={`${
        popupOpen ? "" : "opacity-0"
      } ease absolute -bottom-8 left-0 right-0 whitespace-nowrap transition-opacity duration-300`}
      ref={popup}
    >
      <button
        className="header-profile-button shadow-primary ease rounded-3xl border-2 border-primary bg-black px-4 py-2 text-center shadow-pink-500 transition-all duration-300"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );

  const renderProfile = () => (
    <div
      className="relative flex cursor-pointer items-center"
      onClick={handleClick}
    >
      <div className="mr-4">{session?.user?.name}</div>
      <Image
        className="size-10 rounded-full border-2 border-primary"
        src={`${session?.user?.image}`}
        width={50}
        height={50}
        alt="User Image"
      />
      {renderPopup()}
    </div>
  );

  return (
    <div className="order-2 flex w-[50%] items-center justify-end sm:order-3 sm:w-[unset]">
      {session ? (
        renderProfile()
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  );
}
