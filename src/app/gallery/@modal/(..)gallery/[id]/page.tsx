import Modal from '@/components/Modal';

import { getImageById } from '@/utils/helpers';

export default async function ModalGalleryItemPage({
  params: { id },
}: {
  readonly params: { id: string };
}) {
  const image = await getImageById(id);

  if (!image) return null;

  return <Modal image={image} />;
}
