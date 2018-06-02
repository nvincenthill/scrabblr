import React from 'react';
import ReactDOM from 'react-dom';

//internal components
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//css
import "./css/main.css";
import "./css/animate.css";

//bolt that app on the DOM y'all
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
