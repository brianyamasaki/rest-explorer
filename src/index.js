import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import App from './containers/app';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'sanitize.css/sanitize.css';
import './index.css';

const body = (
  <Provider store={store}>
      <ConnectedRouter history={history}>
          <div className="container">
              <App />
          </div>
      </ConnectedRouter>
  </Provider>
);

ReactDOM.render(body, document.getElementById('root'));
registerServiceWorker();
