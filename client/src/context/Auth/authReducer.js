import {
    REGISTER_USER,
    LOGIN_USER,
    LOAD_USER,
    LOGOUT_USER,
    UPDATE_USER
} from '../types';

export default (state, action) => {

    switch(action.type) {
        
        // register user
        case REGISTER_USER:
            return {
                ...state,
                ...action.payload
            };
        
        // login user
        case LOGIN_USER:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            };

        // load user
        case LOAD_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                docs: action.payload.docs
            };
        
        // logout user
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                docs: null
            };

        default:
            return state;
    }
};