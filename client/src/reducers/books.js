import {
    GET_BOOKS,
    GET_BOOKS_SUCCEED,
    // GET_BOOKS_FAILED,
    CREATE_BOOK,
    CREATE_BOOK_SUCCEED
} from '../constants/books';

const initialState = {
    data: [],
    loading: false,
    isError: false
};

export default (state = initialState, action) => {
    if (action.type === GET_BOOKS) {
        return {...state, loading: true};
    }
    if (action.type === GET_BOOKS_SUCCEED) {
        return {...state, loading: false, data: action.payload};
    }
    // if (action.type === GET_BOOKS_FAILED) {
    //     return {isError: true, loading: false, data: action.payload};
    // }
    if (action.type === CREATE_BOOK) {
        return {...state, loading: true};
    }
    if (action.type === CREATE_BOOK_SUCCEED) {
        return {
            ...state,
            loading: false,
            data: [
                ...state.data,
                action.payload
            ]
        };
    }
    return state;
}