import {
    GET_COLLECTIONS,
    GET_SINGLE_COLLECTION,
    EDIT_SINGLE_COLLECTION,
    ADD_BOOK,
    REMOVE_BOOK
} from '../constants/collections';

export const getCollections = () => {
    return {
        type: GET_COLLECTIONS
    }
};

export const getSingleCollection = (id) => {
    return {
        type: GET_SINGLE_COLLECTION,
        payload: id
    }
};

export const editSingleCollection = (params) => {
    return {
        type: EDIT_SINGLE_COLLECTION,
        payload: params
    }
};

export const addBook = (book, collectionId) => {
    return {
        type: ADD_BOOK,
        payload: {
            book,
            collectionId
        }
    }
};

export const removeBook = (collectionId, bookId, index) => {
    return {
        type: REMOVE_BOOK,
        payload: {
            collectionId,
            bookId,
            index
        }
    }
};
