import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';
import reducer from './reducers';
import middleware from './middleware';
import { RootState } from './types';

const store: Store<RootState> = createStore(reducer, middleware);

ReactDOM.render(
	<Provider store={store}>
		{' '}
		<App />
	</Provider>,
	document.getElementById('root')
);
