import axios from 'axios';

import {
  TGetImageByIdData,
  TGetImagesData,
  TGetNavLinksData,
  TGetUserData,
} from '@/types';

export async function getNavLinks() {
  try {
    const { data }: TGetNavLinksData = await axios.get(`/api/links/nav`);

    return data;
  } catch (error) {
    console.error(error);

    return { error: (error as any).response.data as string };
  }
}

export async function getUser() {
  try {
    const { data }: TGetUserData = await axios.get('/api/user');

    return data;
  } catch (error) {
    console.error(error);

    return { error: (error as any).response.data as string };
  }
}

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

    const { data }: TGetImagesData = await axios.get(`/api/gallery${query}`);

    return data;
  } catch (error) {
    console.error(error);

    return {
      images: [],
      totalPages: 0,
    };
  }
}

export async function getImageById(id: string) {
  try {
    const { data }: TGetImageByIdData = await axios.get(`/api/gallery/${id}`);

    return data;
  } catch (error) {
    console.error(error);

    return { error: (error as any).response.data as string };
  }
}

export async function deleteImage(id: string) {
  try {
    const { data } = await axios.delete(`/api/gallery/${id}`);

    return data;
  } catch (error) {
    console.error(error);

    return { error: (error as any).response.data as string };
  }
}

export async function editImage(id: string, title: string) {
  try {
    const { data } = await axios.patch(`/api/gallery/${id}`, { title });

    return data;
  } catch (error) {
    console.error(error);

    return { error: (error as any).response.data as string };
  }
}
