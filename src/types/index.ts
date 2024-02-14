export type TImage = {
  id: string;
  title: string;
  imageSrc: string;
};

export type TLink = {
  id: string;
  title: string;
  src: string;
};

export type TData = {
  nav_links: TLink[];
  images: TImage[];
};

export type TGetImagesData = {
  data: {
    images: TImage[];
    totalPages: number;
  };
};

export type TGetImageByIdData = {
  data: { image: TImage };
};

export type TGetNavLinksData = {
  data: { nav_links: TLink[] };
};

export type TUser = {
  name: string;
  email: string;
  password: string;
};
