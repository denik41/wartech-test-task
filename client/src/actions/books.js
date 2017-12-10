import {
    GET_BOOKS,
    DELETE_BOOK
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