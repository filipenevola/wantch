const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const getImageUrl = path =>
  path ? `${IMAGE_BASE_URL}${path}` : 'noimage.png';
