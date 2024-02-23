import Link from "next/link";

export default function ZoomLink({ src }: { readonly src: string }) {
  return (
    <Link
      href={src}
      className="link-shadow group absolute left-2 top-2 flex rounded-xl bg-black bg-opacity-50 p-2 transition-colors duration-300 ease-in-out hover:bg-opacity-90"
      target="_blank"
      title="Open full image"
    >
      <i className="icon-search transition-transform duration-300 ease-in-out group-hover:scale-[1.15]"></i>
    </Link>
  );
}
