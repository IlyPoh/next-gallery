'use client';

import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  const search = searchParams.get('search');

  const [open, setOpen] = useState(false);
  const [text, setText] = useState(search ?? '');

  const [query] = useDebounce(text, 500);

  const handleOpen = () => {
    setOpen(prev => !prev);
  };

  const handleClear = () => {
    setText('');
  };

  useEffect(() => {
    if (params.id) return;
    if (query === search) return;
    if (!query && page) router.push(`/gallery?page=${page}`);
    if (query) router.push(`/gallery?page=1&search=${query}`);
  }, [params.id, page, query, router, search]);

  return (
    <div className='absolute left-0 right-0 md:right-auto search-component'>
      <div
        className={`${
          open ? 'open' : 'closed'
        } relative flex items-center px-6 py-2 bg-gray-300 rounded-3xl md:px-8 bg-opacity-60 focus-visible:bg-opacity-100`}
      >
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          type='text'
          placeholder='Search'
          className={`${
            open ? 'open' : 'closed'
          } outline-none text-lg w-full text-black bg-transparent placeholder:text-gray-900 cursor-pointer focus-visible:cursor-text transition-opacity duration-500 ease-in-out`}
        />
        <button
          className='absolute flex items-center justify-center left-1 md:left-2'
          onClick={handleOpen}
        >
          {open ? (
            <i className='text-black icon-cross'></i>
          ) : (
            <i className='icon-search'></i>
          )}
        </button>

        {open && (
          <button
            className={`${
              text.length > 0 && 'opacity-100'
            } absolute right-1 md:right-2 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out`}
            onClick={handleClear}
          >
            <i className='text-black icon-bin'></i>
          </button>
        )}
      </div>
    </div>
  );
}
