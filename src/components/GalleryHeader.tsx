import AddImage from "./AddImage";
import SearchComponent from "./SearchComponent";

export default function GalleryHeader() {
  return (
    <section className="relative mb-6 flex items-center justify-center overflow-hidden">
      <h1 className="text-center">Gallery</h1>
      <SearchComponent />
      <AddImage />
    </section>
  );
}
