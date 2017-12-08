import {
    GET_COLLECTIONS,
    GET_SINGLE_COLLECTION,
    EDIT_SINGLE_COLLECTION,
    ADD_BOOK,
    REMOVE_BOOK,
    CLEAR_SINGLE_COLLECTION,
    DELETE_COLLECTION,
    CREATE_COLLECTION
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

export const editSingleCollection = (params, callback, reqFromSingleCollection = true) => {
    return {
        type: EDIT_SINGLE_COLLECTION,
        payload: params,
        callback,
        reqFromSingleCollection
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

export const removeBook = (data, callback) => {
    return {
        type: REMOVE_BOOK,
        payload: {
            collectionId: data.collectionId,
            bookId: data.bookId,
            index: data.index
        },
        callback
    }
};

export const clearSingleCollection = () => {
    return {
        type: CLEAR_SINGLE_COLLECTION
    }
};

export const deleteCollection = (id, callback) => {
    return {
        type: DELETE_COLLECTION,
        payload: {id},
        callback
    }
};

export const createCollection = (data, callback) => {
    return {
        type: CREATE_COLLECTION,
        payload: data,
        callback
    }
};
