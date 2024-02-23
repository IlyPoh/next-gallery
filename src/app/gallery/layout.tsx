import type { Metadata } from "next";

type TProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Gallery",
  description: "Gallery",
};

export default async function GalleryLayout({
  children,
  modal,
}: Readonly<TProps>) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
