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

// Response types
type TResponseData<T> = {
  data: T;
};

export type TApiResponse<T> = TResponseData<T> | { error: string };
export type TSuccessResponse = { success: boolean; message: string };

export type TApiResponseWithoutData = TApiResponse<TSuccessResponse>;
export type TGetImagesData = TApiResponse<{
  images: TImage[];
  totalPages: number;
}>;
export type TGetImageByIdData = TApiResponse<{ image: TImage }>;
export type TGetNavLinksData = TApiResponse<{ nav_links: TLink[] }>;
export type TGetUserData = TApiResponse<{ user: TUser }>;
