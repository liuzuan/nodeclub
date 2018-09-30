import * as recuder from './recuder.js'
import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';

let store = createStore(
	combineReducers({...recuder}),
	applyMiddleware(thunk)
);

export default store;