"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { TImage } from "@/types";

export default function GalleryItem({ image }: { readonly image: TImage }) {
  const [loading, setLoading] = useState(true);
  const { id, title, imageSrc } = image;

  return (
    <Link
      key={id}
      className="group/galleryItem relative aspect-video w-full overflow-hidden rounded-xl"
      href={`/gallery/${id}`}
      scroll={false}
    >
      <Image
        alt={title}
        src={imageSrc}
        className={`${
          loading ? "skeleton" : ""
        } aspect-video w-full rounded-xl object-cover object-center duration-500 ease-in-out hover:scale-105`}
        width={400}
        height={400}
        priority={false}
        onLoad={() => setLoading(false)}
      />
      <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-40 px-4 py-2 text-center opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/galleryItem:opacity-100">
        {title}
      </div>
    </Link>
  );
}
