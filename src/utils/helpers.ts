import axios from 'axios';

import {
  TGetImageByIdData,
  TGetImagesData,
  TGetNavLinksData,
  TGetUserData,
} from '@/types';

export const getImageType = (fileType: string) => {
  if (fileType === 'image/jpeg') {
    return 'jpg';
  }

  return 'webp';
};

const handleRequest = async (request: Promise<any>) => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    console.error(error);
    return { error: (error as any).response.data as string };
  }
};

export const getNavLinks = (): Promise<TGetNavLinksData | { error: string }> =>
  handleRequest(axios.get<TGetNavLinksData>('/api/links/nav'));

export const getUser = (): Promise<TGetUserData | { error: string }> =>
  handleRequest(axios.get<TGetUserData>('/api/user'));

export const getImageById = (
  id: string
): Promise<TGetImageByIdData | { error: string }> =>
  handleRequest(axios.get<TGetImageByIdData>(`/api/gallery/${id}`));

export const deleteImage = (
  id: string
): Promise<{ success: boolean; message: string } | { error: string }> =>
  handleRequest(axios.delete(`/api/gallery/${id}`));

export const addImage = (
  formData: FormData
): Promise<{ success: boolean; message: string } | { error: string }> =>
  handleRequest(axios.post(`/api/gallery`, formData));

export const editImage = (
  id: string,
  title: string
): Promise<{ success: boolean; message: string } | { error: string }> =>
  handleRequest(axios.patch(`/api/gallery/${id}`, { title }));

export async function getImages({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  try {
    const queryArray: string[] = [];

    queryArray.push(`?page=${page}`);

    if (search) {
      queryArray.push(`&search=${search}`);
    }

    const query = queryArray.join('');

    const { data } = await axios.get<TGetImagesData>(`/api/gallery${query}`);

    return data;
  } catch (error) {
    console.error(error);

    return {
      data: { images: [], totalPages: 0 },
    };
  }
}
