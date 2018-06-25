## Demo

-- link

So far the app has only been tested on the latest version of chrome (67.0.3396.87).

## Running

Run development mode (local development server at localhost:8000)
```
npm run dev
```

Build for production
```
npm run build
```

## React

State management is handled by [https://redux.js.org/](redux). There is dummy code in the actions file for calls to the server to save new/updated item data, but the App currently runs with the assumption that any data sent to the server was saved successfully.

CSS relating to React components is kept in a separate file alongside the JSX file it relates to. These CSS files should be completely modular, if it's JSX component is removed then the CSS should also be able to be deleted without affecting anything else in the site.


## Bootstrap

Implemented via [ReactStrap](https://reactstrap.github.io/).


## CSS

CSS is transformed via [PostCSS] (https://github.com/postcss/postcss). You can find a list of plugins being used in [postcss.config.js](postcss.config.js).

All custom CSS is written using the [BEM] (http://getbem.com/) naming convention and follows the principles of the [SMACSS] (https://smacss.com/) methodology in order to keep the CSS modular and scalable.

Currently I am pulling in the entire bootstrap CSS file, with more time I would load in separate modular CSS files only based on what is needed. Bootstrap 4x also comes with s a PostCSS config file to make this process easier.


## HTML

As the boilerplate is set up as a single page app there is only a single HTML template included - [main.ejs](/src/templates/main.ejs). Title, description, keywords etc are all controlled via variables declared in [webpack.common.js](/webpack.common.js) through the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).
