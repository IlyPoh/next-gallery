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
  id: string;
  name: string;
  email: string;
  password: string;
};
export type TGetUserData = {
  data: {
    user: TUser;
  };
};
