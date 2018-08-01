import rp from 'request-promise';

const API_KEY = '?api_key=cb19752a4a96a51fc14fcca42d113ee3&';
const BASE_URL = 'https://api.themoviedb.org/3/';
const SEARCH_MOVIE = 'search/movie';

const toQueryString = obj =>
  Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&');

const getRequestURL = (method, obj) => `${BASE_URL}${SEARCH_MOVIE}${API_KEY}${toQueryString(obj)}`;

export const findMovies = async obj => {
  if (!obj.query) {
    return null;
  }
  const url = getRequestURL(SEARCH_MOVIE, obj);
  return rp(url);
};
