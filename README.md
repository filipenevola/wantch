# App to manage Movies that you want to Watch: Wantch

I'm creating this repository to teach Meteor, GraphQL, React, PWA, etc at an [event](https://www.even3.com.br/setec18) in Brazil.

To have a better developer experience we are using [meteor-webpack](https://github.com/ardatan/meteor-webpack) package.

Original code copied from [here](https://github.com/ardatan/meteor-webpack/tree/master/examples/react) thanks to [@ardatan](https://github.com/ardatan)

# TODO
- PWA settings
- Test Android Build: not working
- Test iOS Build
- prettier
- eslint
- material icons

## 08/08/2018
### #01 - 19h - Empty app (only layout)
- Javascript
  - template strings
  - conditions: and, or (how they return values)
    - how to use with React `{is && <Component/>}`
  - functions: arrow, return object ({})
  - arrays: includes
  - functional: filter, map
  - modules: import, export
  - promises: then, catch
  - object syntax, short hand syntax
  - destructuring, assign, rest, spread
- CSS
  - mobile first
  - @media only screen and (min-width: 600px)
  - flexbox
- Explain server/main, client/main and api (movies and moviesRest)
- Basic React (component, render, stateless)
### #02 - 19:30h - React Synthetic Events
- Search input onChange
### #03 - 20:00h - Update React State
- Set movies on App state using the REST API
### #04 - 20:30h - Use React State
- List movies and show the count
### #05 - 21:00h - 

### #06 - 21:30h - 

### #07 - 22:00h - 

## 10/08/2018
### #08 - 19h - 

### #09 - 19:30h - Create MongoDB Collection
- Create movies collection and save the movie to watch 
### #10 - 20:00h - Create a React List
- Reusing Movies list components to list the movies saved to watch
### #11 - 20:30h - 
- List saved movies
### #12 - 21:00h - React Details Page
- Movie details component
### #13 - 21:30h - Remove Movie
- List item actions
### #14 - 22:00h - 

# Additional
- lodash debounce
- animation
    &:before {
      background: url("/packages/pathable-styles/images/loading-light.svg") no-repeat center;
      background-color: inherit;
      background-size: contain;
      bottom: 0;
      content: "";
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
    }

## License: MIT
