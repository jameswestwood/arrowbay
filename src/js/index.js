/* @flow */

import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { dogs } from './reducers';

import styles from '../css/base.css';
import critical from '../css/critical.crit.css';

import App from './components/app.jsx';

window.onload = function () {

  let appContainer:?Element = document.getElementById('app');

  if(appContainer != null)
  {
    const store = createStore(dogs);

    render(
          <Provider store={store}>
            <HashRouter>
              <App />
            </HashRouter>
          </Provider>,
        appContainer
      );
    }
    else
    {
      throw new Error("No app container was defined.");
    }
};
