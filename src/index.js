import React from 'react';
import ReactDOM from 'react-dom';
import './Components/App/index.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
