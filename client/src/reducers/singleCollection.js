import {
    GET_SINGLE_COLLECTION,
    GET_SINGLE_COLLECTION_SUCCEED,
    GET_SINGLE_COLLECTION_FAILED,
    EDIT_SINGLE_COLLECTION,
    EDIT_SINGLE_COLLECTION_SUCCEED,
    EDIT_SINGLE_COLLECTION_FAILED,
    ADD_BOOK_SUCCEED,
    REMOVE_BOOK_SUCCEED
} from '../constants/collections';

const initialState = {
    data: null,
    loading: false,
    isError: false
};

export default (state = initialState, action) => {
    if (action.type === GET_SINGLE_COLLECTION) {
        return {...state, loading: true};
    }
    if (action.type === GET_SINGLE_COLLECTION_SUCCEED) {
        return {...state, loading: false, data: action.payload};
    }
    if (action.type === GET_SINGLE_COLLECTION_FAILED) {
        return {isError: true, loading: false, data: action.payload};
    }
    if (action.type === EDIT_SINGLE_COLLECTION) {
        return {...state, loading: true};
    }
    if (action.type === EDIT_SINGLE_COLLECTION_SUCCEED) {
        return {
            ...state,
            loading: false,
            data: {
                ...state.data,
                name: action.payload.name,
                description: action.payload.description
            }};
    }
    if (action.type === EDIT_SINGLE_COLLECTION_FAILED) {
        return {isError: true, loading: false, data: action.payload};
    }
    if (action.type === ADD_BOOK_SUCCEED) {
        return {
            ...state,
            data: {
                ...state.data,
                books: [...state.data.books, action.payload]
            }
        }
    }
    if (action.type === REMOVE_BOOK_SUCCEED) {
        const books = state.data.books.slice();
        books.splice(action.payload, 1);

        return {
            ...state,
            data: {
                ...state.data,
                books
            }
        }
    }
    return state;
}