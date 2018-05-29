import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App.js';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import StateLoader from './StateLoader.js';

const stateLoader = new StateLoader();

let store = createStore(reducer, stateLoader.loadState());
store.subscribe(() => {
    stateLoader.saveState(store.getState());
});
//const store = createStore(reducer);

ReactDOM.render(
	<Provider store = {store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
	, document.getElementById('root'));
registerServiceWorker();
