import {
    GET_BOOKS,
    GET_BOOKS_SUCCEED,
    GET_BOOKS_FAILED,
    DELETE_BOOK,
    DELETE_BOOK_SUCCEED,
    DELETE_BOOK_FAILED
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

function* deleteBookAsync(action) {
    try {
        const response = yield call(axios.delete, `http://localhost:3001/api/books/${action.payload.id}`);
        console.log(response);
        yield put({type: DELETE_BOOK_SUCCEED, payload: response.data});
        yield put({type: GET_BOOKS});
        action.callback();
    } catch (error) {
        console.log("Error occurred: " + error);

        yield put({type: DELETE_BOOK_FAILED, payload: error.message});
    }
}

export function* watchGetBooks() {
    yield takeEvery(GET_BOOKS, getBooksAsync);
}

export function* watchDeleteBook() {
    yield takeEvery(DELETE_BOOK, deleteBookAsync);
}