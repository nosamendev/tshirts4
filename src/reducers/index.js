import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import tshirtReducer from './tshirtReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';
import fetchOrdersReducer from './fetchOrdersReducer';

export default combineReducers({
    modalReducer: modalReducer,
    tshirtReducer: tshirtReducer,
    cartReducer: cartReducer,
    authReducer: authReducer,
    fetchOrdersReducer: fetchOrdersReducer
});

