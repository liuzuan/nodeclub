import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux';
import * as recuder from './recuder.js'
import thunk from 'redux-thunk';

let store = createStore(
	combineReducers({ ...recuder
	}),
	applyMiddleware(thunk)
);
export default store;