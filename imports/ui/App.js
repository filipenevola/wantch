import React, { useEffect, useState } from "react";
import { getImageUrl } from "../api/moviesHelper";

const MAX_OVERVIEW_LENGTH = 250;

export const App = () => {
  const [showMyMovies, setShowMyMovies] = useState(false);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [moviesSearch, setMoviesSearch] = useState([]);

  const clearMoviesSearch = () => setMoviesSearch([]);

  const searchMovies = ({ target: { value } }) => {
    setSearch(value);
    if (!value) {
      loadPopularMovies();
      return;
    }
    Meteor.callAsync("moviesSearch", value)
      .then(result => {
        const data = JSON.parse(result);
        if (!data || !data.results) {
          clearMoviesSearch();
          return;
        }
        const { results: moviesSearch } = data;
        setMoviesSearch(moviesSearch);
      })
      .catch(error => {
        console.error(error);
        clearMoviesSearch();
      });
  };

  const saveMovie = movie => {
    Meteor.callAsync("movieSave", movie).catch(error =>
      console.error(`Error saving a movie ${movie.id}`,error)
    );
    if (!movies.map(({ id }) => id).includes(movie.id)) {
      setMovies([...movies, movie]);
    }
  };

  const removeMovie = movie => {
    Meteor.callAsync("movieRemove", movie).catch(error =>
      console.error(`Error removing a movie ${movie.id}`,error)
    );
    if (movies.map(({ id }) => id).includes(movie.id)) {
      setMovies(movies.filter(m => m.id !== movie.id));
    }
  };

  const loadPopularMovies = () => {
    setMoviesSearch([]);
    Meteor.callAsync("moviesPopular").then(result => {
      const data = JSON.parse(result);
      if (!data || !data.results) {
        return;
      }
      const { results: moviesSearch } = data;
      setMoviesSearch(moviesSearch);
    });
  };

  const toggleShowMyMovies = () => {
    if (showMyMovies) {
      loadPopularMovies();
    }
    setShowMyMovies(!showMyMovies);
    setSearch("");
  };

  useEffect(() => {
    Meteor.callAsync("movies").then(movies => {
      setMovies(movies);
    });
    loadPopularMovies();
  }, []);

  const moviesToShow = showMyMovies ? movies : moviesSearch;
  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              Wantch: {showMyMovies && `My Movies (${movies.length})`}
              {!showMyMovies && !search && "Popular Movies"}
              {!showMyMovies && search && "Search Movies"}
            </h1>
          </div>
          <div>
            <button className="add" onClick={() => toggleShowMyMovies()}>
              {showMyMovies ? "See Popular" : `See My (${movies.length})`}
            </button>
          </div>
        </div>

        <div className="movie-search">
          <div>
            <i className="material-icons">search</i>
          </div>
          <div className="movie-search-text">
            <input
              disabled={showMyMovies}
              type="text"
              value={search}
              placeholder={
                showMyMovies
                  ? "Search disabled on My Movies"
                  : "Type the movie that you want to watch..."
              }
              onChange={searchMovies}
            />
          </div>
        </div>
      </header>

      <div className="main">
        <div className="movie-list">
          {moviesToShow.map((movie, index) => {
            const {
              id,
              title,
              vote_average: voteAverage,
              poster_path: posterPath,
              overview
            } = movie;
            const voteClassName =
              voteAverage < 5 ? "bad" : voteAverage > 7 ? "good" : "default";
            const voteAverageFormatted = !voteAverage
              ? "0.0"
              : voteAverage === 10
                ? "10"
                : voteAverage.toFixed(1);
            const overviewFormatted =
              overview && overview.length > MAX_OVERVIEW_LENGTH
                ? `${overview.substring(0, MAX_OVERVIEW_LENGTH)}...`
                : overview;
            return (
              <div key={id} className="movie-item">
                <div className="movie">
                  <div className="movie-image">
                    <img
                      alt={`Poster of ${title}`}
                      src={getImageUrl(posterPath)}
                    />
                  </div>

                  <div className="movie-content">
                    <div className="movie-title">
                      <strong>{title}</strong>
                    </div>
                    <div className="movie-description">{overviewFormatted}</div>
                    <div className="movie-footer">
                      <div className="movie-vote">
                        <div className={voteClassName}>
                          {voteAverageFormatted}
                        </div>
                      </div>
                      <div className="movie-actions">
                        {movies.map(({ id }) => id).includes(movie.id) ? (
                          <button
                            className="remove"
                            onClick={() => removeMovie(movie)}
                          >
                            remove, please!
                          </button>
                        ) : (
                          <button
                            className="add"
                            onClick={() => saveMovie(movie)}
                          >
                            {index % 2 === 0 ? "want watch!" : "I wantch!"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
