'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import Modal from './Modal';

import { deleteImage, getImageById } from '@/utils/helpers';
import ImageEditor from './ImageEditor';

type ImageOptionsProps = {
  id: string;
};

export default function ImageOptions({ id }: Readonly<ImageOptionsProps>) {
  const router = useRouter();

  const [toolsOpen, setToolsOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [message, setMessage] = useState('');

  const { data: imageData } = useQuery({
    queryKey: ['image', id],
    queryFn: () => getImageById(id),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  if (!imageData || 'error' in imageData) return null;

  const handleOptionsOpen = () => {
    setToolsOpen(!toolsOpen);
  };

  const handleEditorOpen = () => {
    setEditorOpen(!editorOpen);
  };

  const handleDelete = async () => {
    const res = await deleteImage(id);

    if (res.error) {
      setMessage(res.error);
      return;
    }

    if (res.success) {
      setMessage(res.message);
      setTimeout(() => {
        setMessage('');
        setEditorOpen(false);
        router.push('/gallery');
      }, 2000);
    }
  };

  return (
    <div
      className={`${
        toolsOpen ? 'bg-white' : 'bg-black hover:bg-opacity-90 link-shadow'
      } absolute grid grid-cols-1 items-center justify-center right-2 top-2
        bg-opacity-50 transition-color duration-500 ease-in-out rounded-xl`}
    >
      <button
        onClick={handleOptionsOpen}
        className={`${
          toolsOpen ? 'text-black rotate-180' : ''
        } flex hover:scale-[1.15] p-2 hover:text-white transition-all duration-500 ease-in-out`}
        title='Options'
      >
        <i className='icon-cog'></i>
      </button>

      <div className={`${toolsOpen ? 'open' : ''} collapse`}>
        <div className='grid grid-cols-1 overflow-hidden text-black'>
          <button
            onClick={handleEditorOpen}
            className={`transition-all p-2 hover:scale-[1.15] hover:text-yellow-400
              duration-500 ease-in-out flex`}
            title='Edit image'
          >
            <i className='icon-pencil'></i>
          </button>
          <button
            onClick={handleDelete}
            className={`transition-all p-2 hover:scale-[1.15] hover:text-red-600
              duration-500 ease-in-out flex`}
            title='Delete image'
          >
            <i className='icon-cross'></i>
          </button>
        </div>
      </div>

      {message && (
        <Modal>
          <div className='px-6 py-4'>{message}</div>
        </Modal>
      )}

      {editorOpen && (
        <ImageEditor
          handleEditorOpen={handleEditorOpen}
          imageData={imageData.image}
          setMessage={setMessage}
        />
      )}
    </div>
  );
}
