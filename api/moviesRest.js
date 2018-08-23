import rp from 'request-promise';

import {
  API_KEY,
  BASE_URL,
  SEARCH_MOVIE,
  DISCOVER_MOVIE,
} from 'meteor/filipenevola:constants';

const toQueryString = obj =>
  obj
    ? Object.keys(obj)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`
        )
        .join('&')
    : '';

const getRequestURL = (method, obj) =>
  `${BASE_URL}${method}${API_KEY}${toQueryString(obj)}`;

export const searchMovies = async obj => {
  if (!obj.query) {
    return null;
  }
  const url = getRequestURL(SEARCH_MOVIE, obj);
  console.log('url', url);

  return rp(url);
};

export const popularMovies = async () => {
  const url = getRequestURL(DISCOVER_MOVIE);
  return rp(url);
};
