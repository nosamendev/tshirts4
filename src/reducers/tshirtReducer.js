import { FETCH_TSHIRTS, FETCH_TSHIRTS_START, FETCH_TSHIRTS_FAILED } from '../actions/types';

const INITIAL_STATE = {
    error: false,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case FETCH_TSHIRTS:
            return {...state, ...action.payload, loading: false};
        case FETCH_TSHIRTS_START:
            return {...state, loading: true};
        case FETCH_TSHIRTS_FAILED:
            return {...state, error: true, description: action.payload, loading: false};
        
        default:
            return state;
    }
};
