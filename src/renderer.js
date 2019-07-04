// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import React from 'react';
import ReactDOM from 'react-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'components/styles/main.css';
import 'components/styles/input-message.css';
import 'components/styles/auth-form.css';
import 'components/styles/notification.css';
import 'fontawesome/css/all.min.css';

import Auth from  'components/jsx/auth.jsx';

class App extends React.Component {
  render () {
    return (
      <Auth />
    );
  }
}

ReactDOM.render(<App/>,document.getElementById('main'));
