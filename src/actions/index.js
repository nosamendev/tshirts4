import { OPEN_MODAL, CLOSE_MODAL, OPEN_DESIGNER_MEN, OPEN_DESIGNER_WOMEN, 
TSHIRT_GENDER, TSHIRT_SIZE, TSHIRT_TYPE, TSHIRT_COLOR, TSHIRT_DESCRIPTION, TSHIRT_PRICE, 
TSHIRT_ORDERING, TSHIRT_QUANTITY, CART_ITEMS, CART_TOTAL_PRICE,
FETCH_TSHIRTS, FETCH_TSHIRTS_START, FETCH_TSHIRTS_FAILED, SAVE_ORDER, SAVE_ORDER_START, SAVE_ORDER_FAILED,
AUTH, AUTH_START, AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT, AUTH_EMAIL,
FETCH_ORDERS_START, FETCH_ORDERS, FETCH_ORDERS_FAILED } from './types.js'; 

import tshirts from '../api/tshirts.js';
import axios from 'axios'; //for Login we don't use base URL

export const openModal = () => {
    return {
        type: OPEN_MODAL,
        payload: true
    }
}

export const closeModal = () => {
    return {
        type: CLOSE_MODAL,
        payload: false
    }
}

export const openDesignerMen = () => {
    return {type: OPEN_DESIGNER_MEN}
}

export const openDesignerWomen = () => {
    return {type: OPEN_DESIGNER_WOMEN}
}

export const tshirtGender = (gender) => {
    return {
        type: TSHIRT_GENDER,
        payload: gender
    }
}
export const tshirtSize = (size) => {
    return {
        type: TSHIRT_SIZE,
        payload: size
    }
}
export const tshirtType = (type) => {
    return {
        type: TSHIRT_TYPE,
        payload: type
    }
}
export const tshirtColor = (color) => {
    return {
        type: TSHIRT_COLOR,
        payload: color
    }
}

export const tshirtDescription = (description) => {
    return {
        type: TSHIRT_DESCRIPTION,
        payload: description
    }
}

export const tshirtPrice = (price) => {
    return {
        type: TSHIRT_PRICE,
        payload: price
    }
}

export const tshirtQuantity = (quantity) => {
    return {
        type: TSHIRT_QUANTITY,
        payload: quantity
    }
}

export const tshirtOrdering = (status) => {
    return {
        type: TSHIRT_ORDERING,
        payload: status
    }
}

export const cartItems = (number) => {
    return {
        type: CART_ITEMS,
        payload: number
    }
}

export const cartTotalPrice = (price) => {
    return {
        type: CART_TOTAL_PRICE,
        payload: price
    }
}

export const saveOrder = (order, token) => async dispatch => {
    dispatch({type: SAVE_ORDER_START});//!!!sets loading = true
    
    try {
        const response = await tshirts.post('/orders.json?auth=' + token, order);
        dispatch({type: SAVE_ORDER, payload: response.data});
    }
    catch(error) {
        dispatch({type: SAVE_ORDER_FAILED, payload: error})
    }
} 

export const saveOrderFailed = (error) => {
    return {
        type: SAVE_ORDER_FAILED,
        payload: error
    }
}

export const fetchTshirts = () => async dispatch => {
    dispatch({type: FETCH_TSHIRTS_START});//!!!sets loading = true

    try {
        const response = await tshirts.get('/store.json');
        dispatch({type: FETCH_TSHIRTS, payload: response.data})
    }
    catch(error) {
        dispatch({type: FETCH_TSHIRTS_FAILED, payload: error})
    }
}

export const fetchTshirtsFailed = (error) => {
    return {
        type: FETCH_TSHIRTS_FAILED,
        payload: error
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFailed = (error) => {
    return {
        type: AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    return {type: AUTH_LOGOUT}
}

export const authEmail = (email) => {
    return {
        type: AUTH_EMAIL,
        payload: email
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignup) => async dispatch => {
    //Signup or Signin and we have 2 urls for them
    
    dispatch({type: AUTH_START});
    dispatch({type: AUTH_EMAIL, payload: email});

    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAmdtvXRxnHUdCp1JeNHfrpdvFVY8Gotug';
    if (!isSignup){
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAmdtvXRxnHUdCp1JeNHfrpdvFVY8Gotug';
    }
    
    try {
        const response = await axios.post(url, authData);
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

        localStorage.token = response.data.idToken;
        localStorage.expirationDate = expirationDate;
        localStorage.userId = response.data.localId;
        localStorage.email = response.data.email;
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
    }
    catch(error) {
        dispatch(authFailed(error.response.data.error));
    }       
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.token;
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.expirationDate);//to convert it to obj.
            if (expirationDate <= new Date()){
                dispatch(logout());
            }
            else {
                const userId = localStorage.userId;
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            
        }
    }
}

export const fetchOrders = (token, userId) => async dispatch => {

    dispatch({type: FETCH_ORDERS_START});//!!!sets loading = true

    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId+ '"';

    try {
        const response = await tshirts.get('/orders.json' + queryParams);
        dispatch({type: FETCH_ORDERS, payload: response.data});
    }
    catch(error) {
        dispatch({type: FETCH_ORDERS_FAILED, payload: error});
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: FETCH_ORDERS_FAILED,
        payload: error
    }
}
