"use client";

import { useRouter } from "next/navigation";
import { type ElementRef, useRef } from "react";

export default function Modal({
  children,
  navigation = false,
}: {
  readonly children: React.ReactNode;
  readonly navigation?: boolean | (() => void);
}) {
  const overlay = useRef<ElementRef<"div">>(null);
  const router = useRouter();

  const closeModal = () => {
    if (navigation) {
      if (typeof navigation === "function") {
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
      className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden scroll-smooth bg-black bg-opacity-70 backdrop-blur-sm"
      onClick={handleClick}
      ref={overlay}
    >
      <div className="modal rounded-xl bg-black bg-opacity-60">{children}</div>
    </div>
  );
}
