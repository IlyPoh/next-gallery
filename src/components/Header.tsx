'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HEADER_LINK as links } from '@/data/links';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='container mx-auto my-8'>
      {links && (
        <nav>
          <ul className='flex items-center justify-center gap-8'>
            {links.map(link => {
              const isCurrent = pathname === link.src;

              return (
                <li key={link.title}>
                  <Link
                    className={`hover:text-white transition-colors duration-300 ease-in-out ${
                      isCurrent
                        ? 'text-primary pointer-events-none'
                        : 'text-secondary'
                    }`}
                    href={link.src}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
