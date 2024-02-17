'use client';

import { z } from 'zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import Modal from './Modal';
import LoadingRing from './LoadingRing';

import { TImage } from '@/types';

import { editImage } from '@/utils/helpers';

type ImageEditorProps = {
  imageData: TImage;
  handleEditorOpen: () => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

export default function ImageEditor({
  imageData,
  handleEditorOpen,
  setMessage,
}: Readonly<ImageEditorProps>) {
  const router = useRouter();
  const [imageTitle, setImageTitle] = useState('');

  const schema = z
    .object({
      title: z.string().min(1, 'Title is required'),
    })
    .refine(
      data => {
        return data.title !== imageData.title;
      },
      {
        message: 'Title must be different from the current one',
        path: ['title'],
      }
    );
  type TFormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TFormValues>({
    resolver: zodResolver(schema),
  });

  const handleEdit = async (data: TFormValues) => {
    await editImage(imageData.id, data.title).then(() => {
      handleEditorOpen();
      setMessage('Image title updated. Redirecting...');
      setTimeout(() => {
        setMessage('');
        router.push(`/gallery/${imageData.id}`);
      }, 2000);
    });
  };

  return (
    <Modal navigation={handleEditorOpen}>
      <form
        onSubmit={handleSubmit(handleEdit)}
        className='px-6 py-4 flex flex-col items-center gap-4 min-w-[400px]'
      >
        <div>
          <span className='text-gray-500 mr-2'>Current title:</span>
          {imageData.title}
        </div>
        <input
          {...register('title')}
          type='text'
          value={imageTitle}
          onChange={e => setImageTitle(e.target.value)}
          placeholder='Image title'
          className={`py-2 px-4 outline-none bg-transparent border-gray-600
            border-2 rounded-xl focus-visible:border-primary w-full
            transition-colors duration-300 ease-in-out
            ${errors.title && 'border-red-500 focus-visible:border-red-500'}`}
        />
        {errors.title && (
          <div className='text-red-500'>{errors.title.message}</div>
        )}
        <button
          className='bg-gray-600 bg-opacity-70 rounded-xl px-6 py-2 
            hover:bg-primary hover:text-black transition-colors duration-300
              ease-in-out'
        >
          {isSubmitting ? <LoadingRing size={1.5} /> : 'Change image title'}
        </button>
      </form>
    </Modal>
  );
}
