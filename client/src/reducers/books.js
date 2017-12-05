import {
    GET_BOOKS,
    GET_BOOKS_SUCCEED,
    GET_BOOKS_FAILED
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
    if (action.type === GET_BOOKS_FAILED) {
        return {isError: true, loading: false, data: action.payload};
    }
    return state;
}