import {
    GET_COLLECTIONS,
    GET_COLLECTIONS_SUCCEED,
    GET_COLLECTIONS_FAILED,
    GET_SINGLE_COLLECTION,
    GET_SINGLE_COLLECTION_SUCCEED,
    GET_SINGLE_COLLECTION_FAILED,
    EDIT_SINGLE_COLLECTION,
    EDIT_SINGLE_COLLECTION_SUCCEED,
    EDIT_SINGLE_COLLECTION_FAILED
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

function* editSingleCollectionAsync(action) {
    try {
        const config = {
            method: 'PUT',
            url: `http://localhost:3001/api/collections/${action.payload.id}`,
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            data: `name=${action.payload.name}&description=${action.payload.description}`
        };
        const response = yield call(axios, config);
        console.log(response);
        yield put({type: EDIT_SINGLE_COLLECTION_SUCCEED, payload: response.data});
    } catch (error) {
        console.log("Error occurred: " + error);

        yield put({type: EDIT_SINGLE_COLLECTION_FAILED, payload: error.message});
    }
}

function* watchGetCollections() {
    yield takeEvery(GET_COLLECTIONS, getCollectionsAsync);
}

function* watchGetSingleCollection() {
    yield takeEvery(GET_SINGLE_COLLECTION, getSingleCollectionAsync);
}

function* watchEditSingleCollection() {
    yield takeEvery(EDIT_SINGLE_COLLECTION, editSingleCollectionAsync);
}


export default function* root() {
    yield all([
        fork(watchGetCollections),
        fork(watchGetSingleCollection),
        fork(watchEditSingleCollection)
    ]);
}