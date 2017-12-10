import {
    GET_BOOKS,
    GET_BOOKS_SUCCEED,
    GET_BOOKS_FAILED,
    DELETE_BOOK,
    DELETE_BOOK_SUCCEED,
    DELETE_BOOK_FAILED,
    CREATE_BOOK,
    CREATE_BOOK_SUCCEED,
    CREATE_BOOK_FAILED
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
function* createBookAsync(action) {
    try {
        const config = {
            method: 'POST',
            url: `http://localhost:3001/api/books`,
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            data: `name=${action.payload.name}&author=${action.payload.author}&price=${action.payload.price}&rating=${action.payload.rating}`
        };
        const response = yield call(axios, config);
        console.log(response);
        if (response.status === 200) {
            yield put({type: CREATE_BOOK_SUCCEED, payload: response.data});
        }
        action.callback();
    } catch (error) {
        console.log("Error occurred: " + error);

        yield put({type: CREATE_BOOK_FAILED, payload: error.message});
    }
}

export function* watchGetBooks() {
    yield takeEvery(GET_BOOKS, getBooksAsync);
}

export function* watchDeleteBook() {
    yield takeEvery(DELETE_BOOK, deleteBookAsync);
}

export function* watchCreateBook() {
    yield takeEvery(CREATE_BOOK, createBookAsync);
}