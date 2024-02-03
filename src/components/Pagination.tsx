'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type TPaginationProps = {
  readonly currentPage: number;
  readonly totalPages: number;
};

export default function Pagination({
  totalPages,
  currentPage,
}: TPaginationProps) {
  const search = useSearchParams().get('search');

  return (
    <>
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
        })}
    </>
  );
}
