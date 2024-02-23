"use client";

import { useQuery } from "@tanstack/react-query";

import GalleryItem from "./GalleryItem";

import { getImages } from "@/utils/helpers";

export default function ImagesGallery({
  searchParams: { page, search },
}: {
  readonly searchParams: { page: string; search: string };
}) {
  const currentPage = Number(page) || 1;

  const {
    data: imagesData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["images", currentPage, search],
    queryFn: () => getImages({ page: currentPage, search: search }),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  if (!imagesData || "error" in imagesData) return null;

  const { images } = imagesData.data;

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {images.length !== 0 ? (
        <section
          className={`${
            isLoading ? "skeleton" : ""
          } mb-6 grid grid-cols-1 gap-2 rounded-xl md:grid-cols-3 md:gap-4`}
        >
          {images.map((image) => (
            <GalleryItem image={image} key={image.title} />
          ))}
        </section>
      ) : (
        <div className="text-center text-4xl font-bold">No images found</div>
      )}
    </>
  );
}
