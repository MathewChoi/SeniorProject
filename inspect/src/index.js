import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App, {CreateAccount} from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CreateAccount />, document.getElementById('root'));
registerServiceWorker();
