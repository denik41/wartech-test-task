import {
    GET_BOOKS
} from '../constants/books';

export const getBooks = () => {
    return {
        type: GET_BOOKS
    }
};