import {
    GET_COLLECTIONS,
    GET_COLLECTIONS_SUCCEED,
    GET_COLLECTIONS_FAILED,
    CREATE_COLLECTION_SUCCEED
} from '../constants/collections';

const initialState = {
    data: [],
    loading: false,
    isError: false
};

export default (state = initialState, action) => {
    if (action.type === GET_COLLECTIONS) {
        return {...state, loading: true};
    }
    if (action.type === GET_COLLECTIONS_SUCCEED) {
        return {...state, loading: false, data: action.payload};
    }
    // if (action.type === GET_COLLECTIONS_FAILED) {
    //     return {isError: true, loading: false, data: action.payload};
    // }
    if (action.type === CREATE_COLLECTION_SUCCEED) {
        return {
            ...state,
            data: [
                ...state.data,
                action.payload
            ]
        };
    }
    return state;
}