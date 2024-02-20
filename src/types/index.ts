export type TImage = {
  id: string;
  title: string;
  imageSrc: string;
  userId: string;
};

export type TLink = {
  id: string;
  title: string;
  src: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type TResponseData<T> = {
  data: T;
};

export type TGetImagesData = TResponseData<{
  images: TImage[];
  totalPages: number;
}>;

export type TGetImageByIdData = TResponseData<{ image: TImage }>;

export type TGetNavLinksData = TResponseData<{ nav_links: TLink[] }>;

export type TGetUserData = TResponseData<{ user: TUser }>;
