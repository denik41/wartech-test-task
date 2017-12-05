import { combineReducers } from 'redux';
import collections from './collections';
import singleCollection from './singleCollection';
import books from './books';

export default combineReducers({
    collections,
    singleCollection,
    books
});