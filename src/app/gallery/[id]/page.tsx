import { type Metadata } from 'next';
import Image from 'next/image';

import { getImageById } from '@/utils/helpers';

export const generateMetadata = async ({
  params: { id },
}: {
  readonly params: { id: string };
}): Promise<Metadata> => {
  const image = await getImageById(id);

  return {
    title: image?.title ?? 'Gallery item',
    description: image?.title ?? 'Gallery item',
  };
};

export default async function GalleryItemPage({
  params: { id },
}: {
  readonly params: { id: string };
}) {
  const image = await getImageById(id);

  if (!image) return null;

  const { title, imageSrc } = image;

  return (
    <div className='container mx-auto py-8'>
      <div className='w-full flex items-center flex-col gap-4'>
        <Image
          alt={title}
          src={imageSrc}
          className='max-w-[1000px] w-full h-auto'
          width={1000}
          height={1000}
          priority
          quality={100}
        />
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='text-center font-bold'>{title}</h1>
        </div>
      </div>
    </div>
  );
}
