import axios from 'axios';

import { env } from 'process';
import { TImage } from '@/types';

type TGetImagesProps = {
  images: TImage[];
  totalPages: number;
};

const { SITE_URL } = env;

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

    const { data } = await axios.get(`/api/gallery${query}`);

    return data as TGetImagesProps;
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
    const { data } = await axios.get(`${SITE_URL}/api/gallery/${id}`);

    return data as TImage;
  } catch (error) {
    console.error(error);

    return null;
  }
}
