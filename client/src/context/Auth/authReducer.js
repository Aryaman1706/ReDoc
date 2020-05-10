import {
    REGISTER_USER,
    LOGIN_USER,
    LOAD_USER,
    LOGOUT_USER,
    UPDATE_USER,
    ADD_DOC,
    LOAD_DOCS
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
                docList: action.payload.docs
            };
        
        // update user
        case UPDATE_USER:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            };
        
        // logout user
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                docList: null,
                docs: null
            };

        // add doc
        case ADD_DOC:
            return{
                ...state,
                docList: [ action.payload._id, ...state.docList ],
                docs: [ action.payload, ...state.docs ]
            };

        default:
            return state;
    }
};