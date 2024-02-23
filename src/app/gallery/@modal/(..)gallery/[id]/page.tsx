import ModalForImage from "@/components/ModalForImage";

export default function ModalGalleryItemPage({
  params: { id },
}: {
  readonly params: { id: string };
}) {
  return <ModalForImage id={id} />;
}
