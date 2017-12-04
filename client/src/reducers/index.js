import { combineReducers } from 'redux';
import collections from './collections';
import singleCollection from './singleCollection';

export default combineReducers({
    collections,
    singleCollection
});