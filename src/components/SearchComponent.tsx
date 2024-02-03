'use client';

import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const page = searchParams.get('page');
  const search = searchParams.get('search');

  const [text, setText] = useState(search ?? '');
  const [open, setOpen] = useState(false);

  const [query] = useDebounce(text, 500);

  const handleOpen = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    if (params.id) return;
    if (query === search) return;
    if (!query && page) router.push(`/gallery?page=${page}`);
    if (query) router.push(`/gallery?page=1&search=${query}`);
  }, [params.id, page, query, router, search]);

  return (
    <div className='absolute left-0 search-component flex items-center'>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        type='text'
        placeholder='Search'
        className={`${
          open ? 'open' : 'closed'
        } outline-none rounded-md text-xl pl-6 pr-2 py-1 text-black bg-gray-300 placeholder:text-gray-900`}
      />
      <button
        className={`absolute left-1 flex items-center justify-center`}
        onClick={handleOpen}
      >
        {open ? (
          <i className='icon-cross text-black'></i>
        ) : (
          <i className='icon-search'></i>
        )}
      </button>
    </div>
  );
}
