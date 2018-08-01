import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { methodCall } from './methods';

class App extends Component {
  state = {
    movies: [],
    moviesIds: [],
    moviesSearch: [],
    pristine: true,
  };

  clearMoviesSearch = () =>
    this.setState(() => ({
      moviesSearch: [],
    }));

  searchMovies = ({ target: { value } }) => {
    this.setState(() => ({
      pristine: false,
    }));
    methodCall('moviesSearch', value)
      .then(result => {
        const data = JSON.parse(result);
        if (!data || !data.results) {
          this.clearMoviesSearch();
          return;
        }
        const { results: moviesSearch } = data;
        this.setState(() => ({
          moviesSearch,
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

  componentDidMount() {
    methodCall('movies').then(movies =>
      this.setState(() => ({ movies, moviesIds: movies.map(m => m.id) }))
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          {this.state.pristine && <h1>Movies Search</h1>}
          {!this.state.pristine && (
            <h1>Movies found ({this.state.moviesSearch.length})</h1>
          )}

          <label className="hide-completed">
            <input type="checkbox" readOnly checked={true} />
            Hide Completed Tasks
          </label>

          <form className="new-task">
            <input
              type="text"
              ref="textInput"
              placeholder="Busque o filme que deseja"
              onChange={this.searchMovies}
            />
          </form>
        </header>

        <ul>
          {this.state.moviesSearch.map(movie => {
            const { id, title, vote_average: voteAverage } = movie;
            return (
              <li key={id}>
                {this.state.moviesIds.includes(movie.id) ? (
                  <button
                    className="delete"
                    onClick={() => this.removeMovie(movie)}
                  >
                    remove
                  </button>
                ) : (
                  <button
                    className="delete"
                    onClick={() => this.saveMovie(movie)}
                  >
                    add
                  </button>
                )}
                <input type="checkbox" readOnly checked={false} />
                <button className="toggle-private">Private</button>
                <span className="text">
                  <strong>{title}</strong> {voteAverage}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default hot(module)(App);
