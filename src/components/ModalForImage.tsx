"use client";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

import Modal from "./Modal";
import ZoomLink from "./ZoomLink";
import LoadingSpinner from "./LoadingSpinner";

import { getImageById, getUser } from "@/utils/helpers";
import ImageOptions from "./ImageOptions";

type TModalProps = Readonly<{
  id: string;
}>;

export default function ModalForImage({ id }: TModalProps) {
  const session = useSession();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { data: imageData } = useQuery({
    queryKey: ["image", id],
    queryFn: () => getImageById(id),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
    enabled: !!session.data?.user,
  });

  const handleLoad = () => {
    setImageLoaded(true);
  };

  if (!imageData || "error" in imageData) return null;

  const { image } = imageData.data;
  const { title, imageSrc } = image;
  const commonClasses = imageLoaded ? "opacity-100" : "opacity-0";

  return (
    <Modal navigation>
      {!imageLoaded && <LoadingSpinner />}
      <div
        className={`${commonClasses} relative flex max-w-[1000px] flex-col
        items-center justify-center text-center text-white transition-opacity
        duration-500`}
      >
        <Image
          alt={title}
          src={imageSrc}
          width={1000}
          height={1000}
          className="max-h-[80vh] w-auto rounded-t-xl"
          quality={100}
          priority
          onLoad={handleLoad}
        />
        {imageLoaded && (
          <>
            <ZoomLink src={imageSrc} />
            {userData &&
              !("error" in userData) &&
              userData?.data.user.id === image.userId && (
                <ImageOptions id={id} />
              )}
          </>
        )}
        <div className="flex w-full max-w-[1000px] flex-col text-center">
          <h1 className="m-4 text-center font-bold">{title}</h1>
        </div>
      </div>
    </Modal>
  );
}
