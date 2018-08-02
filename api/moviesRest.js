import rp from 'request-promise';

const API_KEY = '&api_key=cb19752a4a96a51fc14fcca42d113ee3&';
const BASE_URL = 'https://api.themoviedb.org/3/';
const SEARCH_MOVIE = 'search/movie?';
const DISCOVER_MOVIE =
  'discover/movie?sort_by=vote_average.desc&vote_count.gte=50';

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
  return rp(url);
};

export const popularMovies = async () => {
  const url = getRequestURL(DISCOVER_MOVIE);
  return rp(url);
};
