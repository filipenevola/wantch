import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { methodCall } from './methods';
import { getImageUrl } from '../api/moviesHelper';
const MAX_OVERVIEW_LENGTH = 250;

class App extends Component {
  state = {
    showMyMovies: false,
    movies: [],
    moviesIds: [],
    search: '',
    moviesSearch: [],
    moviesSearchTotal: 0,
  };

  clearMoviesSearch = () =>
    this.setState(() => ({
      moviesSearch: [],
    }));

  searchMovies = ({ target: { value } }) => {
    this.setState(() => ({
      search: value,
    }));
    if (!value) {
      this.loadPopularMovies();
      return;
    }
    methodCall('moviesSearch', value)
      .then(result => {
        const data = JSON.parse(result);
        if (!data || !data.results) {
          this.clearMoviesSearch();
          return;
        }
        const {
          results: moviesSearch,
          total_results: moviesSearchTotal,
        } = data;
        this.setState(() => ({
          moviesSearch,
          moviesSearchTotal,
        }));
      })
      .catch(error => {
        console.error(error);
        this.clearMoviesSearch();
      });
  };

  saveMovie = movie => {
    methodCall('movieSave', movie);
    this.setState(({ movies, moviesIds }) => {
      if (moviesIds.includes(movie.id)) return {};
      return {
        movies: [...movies, movie],
        moviesIds: [...moviesIds, movie.id],
      };
    });
  };

  removeMovie = movie => {
    methodCall('movieRemove', movie);
    this.setState(({ movies, moviesIds }) => {
      if (!moviesIds.includes(movie.id)) return {};
      return {
        movies: movies.filter(m => m.id !== movie.id),
        moviesIds: moviesIds.filter(id => id !== movie.id),
      };
    });
  };

  loadPopularMovies = () => {
    this.setState(() => ({
      moviesSearch: [],
    }));
    methodCall('moviesPopular').then(result => {
      const data = JSON.parse(result);
      if (!data || !data.results) {
        return;
      }
      const { results: moviesSearch } = data;
      this.setState(() => ({
        moviesSearch,
      }));
    });
  };

  toggleShowMyMovies = () => {
    return this.setState(
      ({ showMyMovies }) => ({
        showMyMovies: !showMyMovies,
        search: '',
      }),
      () => !this.state.showMyMovies && this.loadPopularMovies()
    );
  };

  componentDidMount() {
    methodCall('movies').then(movies =>
      this.setState(() => ({ movies, moviesIds: movies.map(m => m.id) }))
    );
    this.loadPopularMovies();
  }

  render() {
    const movies = this.state.showMyMovies
      ? this.state.movies
      : this.state.moviesSearch;
    return (
      <div className="app">
        <header>
          <div className="app-bar">
            <div className="app-header">
              <h1>
                Wantch: {this.state.showMyMovies && `My Movies (${this.state.movies.length})`}
                {!this.state.showMyMovies &&
                  !this.state.search &&
                  'Popular Movies'}
                {!this.state.showMyMovies &&
                  this.state.search &&
                  'Search Movies'}
              </h1>
            </div>
            <div>
              <button className="add" onClick={() => this.toggleShowMyMovies()}>
                {this.state.showMyMovies
                  ? 'See Popular'
                  : `See My (${this.state.movies.length})`}
              </button>
            </div>
          </div>

          <div className="movie-search">
            <div>
              <i className="material-icons">search</i>
            </div>
            <div className="movie-search-text">
              <input
                disabled={this.state.showMyMovies}
                type="text"
                ref="textInput"
                value={this.state.search}
                placeholder={
                  this.state.showMyMovies
                    ? 'Search disabled on My Movies'
                    : 'Type the movie that you want to watch...'
                }
                onChange={this.searchMovies}
              />
            </div>
          </div>
        </header>

        <div className="main">
          <div className="movie-list">
            {movies.map((movie, index) => {
              const {
                id,
                title,
                vote_average: voteAverage,
                poster_path: posterPath,
                overview,
              } = movie;
              const voteClassName =
                voteAverage < 5 ? 'bad' : voteAverage > 7 ? 'good' : 'default';
              const voteAverageFormatted = !voteAverage
                ? '0.0'
                : voteAverage === 10
                  ? '10'
                  : voteAverage.toFixed(1);
              const overviewFormatted =
                overview && overview.length > MAX_OVERVIEW_LENGTH
                  ? `${overview.substring(0, MAX_OVERVIEW_LENGTH)}...`
                  : overview;
              return (
                <div key={id} className="movie-item">
                  <div className="movie">
                    <div className="movie-image">
                      <img src={getImageUrl(posterPath)} />
                    </div>

                    <div className="movie-content">
                      <div className="movie-title">
                        <strong>{title}</strong>
                      </div>
                      <div className="movie-description">
                        {overviewFormatted}
                      </div>
                      <div className="movie-footer">
                        <div className="movie-vote">
                          <div className={voteClassName}>
                            {voteAverageFormatted}
                          </div>
                        </div>
                        <div className="movie-actions">
                          {this.state.moviesIds.includes(movie.id) ? (
                            <button
                              className="remove"
                              onClick={() => this.removeMovie(movie)}
                            >
                              remove, please!
                            </button>
                          ) : (
                            <button
                              className="add"
                              onClick={() => this.saveMovie(movie)}
                            >
                              {index % 2 === 0 ? 'want watch!' : 'I wantch!'}
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
  }
}

export default hot(module)(App);
