'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { getImages } from '@/utils/helpers';

export default function Pagination({
  searchParams: { page, search },
}: {
  readonly searchParams: { page: string; search: string };
}) {
  const currentPage = Number(page) || 1;

  const { data } = useQuery({
    queryKey: ['images', currentPage, search],
    queryFn: () => getImages({ page: currentPage, search: search }),
  });

  if (!data) return null;

  const { totalPages } = data.data;

  return (
    <section className='flex items-center justify-center gap-4 mb-6 font-bold'>
      {totalPages > 1 &&
        Array.from(Array(totalPages).keys()).map((_, index) => {
          const pageNumber = index + 1;
          const query = search
            ? `?page=${pageNumber}&search=${search}`
            : `?page=${pageNumber}`;

          return (
            <Link
              href={query}
              key={pageNumber}
              scroll={false}
              className={`${
                currentPage === pageNumber
                  ? 'text-primary pointer-events-none'
                  : 'text-secondary hover:text-white'
              } transition-colors duration-300 ease-in-out`}
            >
              {pageNumber}
            </Link>
          );
        })}{' '}
    </section>
  );
}
