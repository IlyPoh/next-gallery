"use client";

import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function SearchComponent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const search = searchParams.get("search");

  const [open, setOpen] = useState(false);
  const [text, setText] = useState(search ?? "");

  const [query] = useDebounce(text, 500);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClear = () => {
    setText("");
  };

  useEffect(() => {
    if (params.id) return;
    if (query === search) return;
    if (!query && page) router.push(`/gallery?page=${page}`);
    if (query) router.push(`/gallery?page=1&search=${query}`);
  }, [params.id, page, query, router, search]);

  const commonClasses = open ? "open" : "closed";

  return (
    <div className="search-component absolute left-0 right-0 md:right-auto">
      <div
        className={`${commonClasses} relative flex items-center rounded-3xl bg-gray-300
        bg-opacity-60 px-6 py-2 focus-visible:bg-opacity-100 md:px-8`}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Search"
          className={`${commonClasses} w-full cursor-pointer bg-transparent text-lg
          text-black outline-none transition-opacity duration-500
          ease-in-out placeholder:text-gray-900 focus-visible:cursor-text`}
        />
        <button
          className="absolute left-1 flex items-center justify-center md:left-2"
          onClick={handleOpen}
        >
          {open ? (
            <i className="icon-cross text-black"></i>
          ) : (
            <i className="icon-search"></i>
          )}
        </button>

        {open && (
          <button
            className={`${
              text.length > 0 && "opacity-100"
            } absolute right-1 flex items-center justify-center opacity-0
            transition-opacity duration-300 ease-in-out md:right-2`}
            onClick={handleClear}
          >
            <i className="icon-bin text-black"></i>
          </button>
        )}
      </div>
    </div>
  );
}
