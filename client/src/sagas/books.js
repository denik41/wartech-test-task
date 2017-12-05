import {
    GET_BOOKS,
    GET_BOOKS_SUCCEED,
    GET_BOOKS_FAILED
} from '../constants/books';
import {call, takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

function* getBooksAsync(action) {
    try {
        const response = yield call(axios.get, 'http://localhost:3001/api/books');
        console.log(response);
        yield put({type: GET_BOOKS_SUCCEED, payload: response.data});
    } catch (error) {
        console.log("Error occurred: " + error);

        yield put({type: GET_BOOKS_FAILED, payload: error.message});
    }
}

export function* watchGetBooks() {
    yield takeEvery(GET_BOOKS, getBooksAsync);
}