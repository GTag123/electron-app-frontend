// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'components/redux/store/mainstore';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'components/styles/main.css';
import 'components/styles/input-message.css';
import 'components/styles/auth-form.css';
import 'components/styles/notification.css';
import 'fontawesome/css/all.min.css';

import MainView from  'components/jsx/mainview.jsx';

class App extends React.Component {
  render () {
    return (
      <Provider store={store} >
        <MainView />
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
