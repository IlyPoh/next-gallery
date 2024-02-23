import Pagination from "@/components/Pagination";
import GalleryHeader from "@/components/GalleryHeader";
import ImagesGallery from "@/components/ImagesGallery";

export default function GalleryPage({
  searchParams,
}: {
  readonly searchParams: { page: string; search: string };
}) {
  return (
    <div className="container mx-auto px-2">
      <GalleryHeader />

      <ImagesGallery searchParams={searchParams} />

      <Pagination searchParams={searchParams} />
    </div>
  );
}
