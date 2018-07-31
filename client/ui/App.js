import { Meteor } from 'meteor/meteor';
import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { Movies } from './Movies';

class App extends Component {
  state = {
    movies: [],
  };

  searchMovies = ({ target: { value } }) => {
    Meteor.call('moviesSearch', value, (error, result) => {
      const data = JSON.parse(result);
      if (!data || !data.results) {
        return;
      }
      const { results: movies } = data;
      this.setState(() => ({
        movies,
      }));
    });
  };

  render() {
    return (
      <div className="container">
        <header>
          <h1>Filmes ({this.state.movies.length})</h1>

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
