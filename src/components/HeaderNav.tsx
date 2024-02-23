"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getNavLinks } from "@/utils/helpers";

export default function HeaderNav() {
  const pathname = usePathname();

  const { data: navLinksData } = useQuery({
    queryKey: ["nav_links"],
    queryFn: () => getNavLinks(),
  });

  if (!navLinksData || "error" in navLinksData) return null;

  const { nav_links: links } = navLinksData.data;

  return (
    <>
      {links && (
        <nav className="order-3 w-full sm:order-2 sm:w-auto">
          <ul className="flex items-center justify-center gap-8">
            {links.map((link) => {
              const isCurrent = pathname === link.src;

              return (
                <li key={link.title}>
                  <Link
                    className={`transition-colors duration-300 ease-in-out hover:text-white ${
                      isCurrent
                        ? "pointer-events-none text-primary"
                        : "text-secondary"
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
    </>
  );
}
