import {all, fork} from 'redux-saga/effects';
import {
    watchEditSingleCollection,
    watchGetCollections,
    watchGetSingleCollection,
    watchAddBook,
    watchRemoveBook,
    watchDeleteCollection,
    watchCreateCollection
} from './collections';
import {
    watchGetBooks
} from './books';

export default function* root() {
    yield all([
        fork(watchGetCollections),
        fork(watchGetSingleCollection),
        fork(watchEditSingleCollection),
        fork(watchGetBooks),
        fork(watchAddBook),
        fork(watchRemoveBook),
        fork(watchDeleteCollection),
        fork(watchCreateCollection)
    ]);
}