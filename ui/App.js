import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { methodCall } from './methods';

class App extends Component {
  state = {
    movies: [],
    pristine: true,
  };

  clearMovies = () =>
    this.setState(() => ({
      movies: [],
    }));

  searchMovies = ({ target: { value } }) => {
    this.setState(() => ({
      pristine: false,
    }));
    methodCall('moviesSearch', value)
      .then(result => {
        const data = JSON.parse(result);
        if (!data || !data.results) {
          this.clearMovies();
          return;
        }
        const { results: movies } = data;
        this.setState(() => ({
          movies,
        }));
      })
      .catch(error => {
        console.error(error);
        this.clearMovies();
      });
  };

  render() {
    return (
      <div className="container">
        <header>
          {this.state.pristine && <h1>Movies Search</h1>}
          {!this.state.pristine && (
            <h1>Movies found ({this.state.movies.length})</h1>
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
          {this.state.movies.map(({ id, title, vote_average: voteAverage }) => (
            <li key={id}>
              <button className="delete">&times;</button>
              <input type="checkbox" readOnly checked={false} />
              <button className="toggle-private">Private</button>
              <span className="text">
                <strong>{title}</strong> {voteAverage}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default hot(module)(App);
