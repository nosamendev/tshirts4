import { FETCH_ORDERS_START, FETCH_ORDERS, FETCH_ORDERS_FAILED } from '../actions/types';

const INITIAL_STATE = {
    error: false,
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case FETCH_ORDERS_START:
            return {...state, loading: true};
        case FETCH_ORDERS:
            return {...state, loading: false, orders: action.payload};
        case FETCH_ORDERS_FAILED:
            return {...state, error: true, loading: false};
        default:
            return state;
    }
};