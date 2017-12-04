import {
    GET_COLLECTIONS,
    GET_COLLECTIONS_SUCCEED,
    GET_COLLECTIONS_FAILED,
    GET_SINGLE_COLLECTION,
    GET_SINGLE_COLLECTION_SUCCEED,
    GET_SINGLE_COLLECTION_FAILED
} from '../constants';
import {call, takeEvery, all, fork, put} from 'redux-saga/effects';
import axios from 'axios';

function* getCollectionsAsync(action) {
    try {
        const response = yield call(axios.get, 'http://localhost:3001/api/collections');
        console.log(response);
        yield put({type: GET_COLLECTIONS_SUCCEED, payload: response.data});
    } catch (error) {
        console.log("Error occurred: " + error);

        yield put({type: GET_COLLECTIONS_FAILED, payload: error.message});
    }
}

function* getSingleCollectionAsync(action) {
    try {
        const response = yield call(axios.get, `http://localhost:3001/api/collections/${action.payload}`);
        console.log(response);
        yield put({type: GET_SINGLE_COLLECTION_SUCCEED, payload: response.data});
    } catch (error) {
        console.log("Error occurred: " + error);

        yield put({type: GET_SINGLE_COLLECTION_FAILED, payload: error.message});
    }
}

function* watchGetCollections() {
    yield takeEvery(GET_COLLECTIONS, getCollectionsAsync);
}

function* watchGetSingleCollection() {
    yield takeEvery(GET_SINGLE_COLLECTION, getSingleCollectionAsync);
}

export default function* root() {
    yield all([
        fork(watchGetCollections),
        fork(watchGetSingleCollection)
    ]);
}