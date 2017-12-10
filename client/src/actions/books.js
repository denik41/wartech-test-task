import {
    GET_BOOKS,
    DELETE_BOOK,
    CREATE_BOOK,
    RATE_BOOK
} from '../constants/books';

export const getBooks = () => {
    return {
        type: GET_BOOKS
    }
};

export const deleteBook = (id, callback) => {
    return {
        type: DELETE_BOOK,
        payload: {
            id
        },
        callback
    }
};

export const createBook = (data, callback) => {
    return {
        type: CREATE_BOOK,
        payload: data,
        callback
    }
};

export const rateBook = (data, index, callback) => {
    return {
        type: RATE_BOOK,
        payload: data,
        index,
        callback
    }
};