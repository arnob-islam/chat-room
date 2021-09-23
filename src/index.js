import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import TheProvider from './components/Provider/Anonymus';

ReactDOM.render(
  <React.Fragment>
    <TheProvider>
      <App />
    </TheProvider>
  </React.Fragment>,
  document.getElementById('root')
);


