import {
    GET_SINGLE_COLLECTION,
    GET_SINGLE_COLLECTION_SUCCEED,
    GET_SINGLE_COLLECTION_FAILED
} from '../constants';

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
    return state;
}