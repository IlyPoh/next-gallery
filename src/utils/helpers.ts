import axios, { AxiosResponse } from "axios";

import {
  TApiResponse,
  TApiResponseWithoutData,
  TGetImageByIdData,
  TGetImagesData,
  TGetNavLinksData,
  TGetUserData,
} from "@/types";

export const getImageType = (fileType: string) => {
  if (fileType === "image/jpeg") {
    return "jpg";
  }

  return "webp";
};

export const handleRequest = async <T>(
  request: Promise<AxiosResponse<T>>,
): Promise<TApiResponse<T>> => {
  try {
    const data = await request;
    return data;
  } catch (error) {
    console.error(error);
    return { error: (error as any).response.data as string };
  }
};

export const getNavLinks = (): Promise<TGetNavLinksData> =>
  handleRequest(axios.get("/api/links/nav"));

export const getUser = (): Promise<TGetUserData> =>
  handleRequest(axios.get("/api/user"));

export const getImageById = (id: string): Promise<TGetImageByIdData> =>
  handleRequest(axios.get(`/api/gallery/${id}`));

export const deleteImage = (id: string): Promise<TApiResponseWithoutData> =>
  handleRequest(axios.delete(`/api/gallery/${id}`));

export const addImage = (
  formData: FormData,
): Promise<TApiResponseWithoutData> =>
  handleRequest(axios.post(`/api/gallery`, formData));

export const editImage = (
  id: string,
  title: string,
): Promise<TApiResponseWithoutData> =>
  handleRequest(axios.patch(`/api/gallery/${id}`, { title }));

export async function getImages({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<TGetImagesData> {
  try {
    const queryArray: string[] = [];

    queryArray.push(`?page=${page}`);

    if (search) {
      queryArray.push(`&search=${search}`);
    }

    const query = queryArray.join("");

    const data = await axios.get(`/api/gallery${query}`);

    return data;
  } catch (error) {
    console.error(error);

    return {
      data: { images: [], totalPages: 0 },
    };
  }
}
