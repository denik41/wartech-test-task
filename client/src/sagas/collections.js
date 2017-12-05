import {
    GET_COLLECTIONS,
    GET_COLLECTIONS_SUCCEED,
    GET_COLLECTIONS_FAILED,
    GET_SINGLE_COLLECTION,
    GET_SINGLE_COLLECTION_SUCCEED,
    GET_SINGLE_COLLECTION_FAILED,
    EDIT_SINGLE_COLLECTION,
    EDIT_SINGLE_COLLECTION_SUCCEED,
    EDIT_SINGLE_COLLECTION_FAILED,
    ADD_BOOK,
    ADD_BOOK_SUCCEED,
    ADD_BOOK_FAILED
} from '../constants/collections';
import {call, takeEvery, put} from 'redux-saga/effects';
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

function* addBookAsync(action) {
    try {
        console.log(action.payload.book._id);
        const config = {
            method: 'POST',
            url: `http://localhost:3001/api/collections/${action.payload.collectionId}/books`,
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            data: `bookId=${action.payload.book._id}`
        };
        const response = yield call(axios, config);
        console.log(response);
        if (response.status === 200) {
            yield put({type: ADD_BOOK_SUCCEED, payload: action.payload.book});
        }
    } catch (error) {
        console.log("Error occurred: " + error);

        yield put({type: ADD_BOOK_FAILED, payload: error.message});
    }
}

export function* watchGetCollections() {
    yield takeEvery(GET_COLLECTIONS, getCollectionsAsync);
}

export function* watchGetSingleCollection() {
    yield takeEvery(GET_SINGLE_COLLECTION, getSingleCollectionAsync);
}

export function* watchEditSingleCollection() {
    yield takeEvery(EDIT_SINGLE_COLLECTION, editSingleCollectionAsync);
}

export function* watchAddBook() {
    yield takeEvery(ADD_BOOK, addBookAsync);
}
