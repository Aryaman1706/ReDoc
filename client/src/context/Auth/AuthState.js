import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
    REGISTER_USER,
    LOGIN_USER,
    LOAD_USER,
    LOGOUT_USER,
    UPDATE_USER
} from '../types';

const AuthState = (props) => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        docs: null
    };
    
    const [ state, dispatch ] = useReducer(authReducer, initialState);
    
    // Register user
    const registerUser = async ( formData ) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try{
            const res = await axios.post('/api/user', formData, config);

            dispatch({
                type: REGISTER_USER,
                payload: res.data
            });
        } catch (err) {
            console.log(err);
        }
    };

    // login user
    const loginUser = async ( formData ) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/auth', formData, config);

            dispatch({
                type: LOGIN_USER,
                payload: res.data
            })
        } catch (err) {
            console.log(err);
        }
    };

    // load user
    const loadUser = async () => {
        console.log("load user");
        setAuthToken(localStorage.getItem('token'));
        const res = await axios.get('/api/user/me');
        
        dispatch({
            type: LOAD_USER,
            payload: res.data
        })
    };

    // logout user
    const logoutUser = async () => {
        dispatch({
            type: LOGOUT_USER
        });
    };

    // return --->
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                docs: state.docs,
                registerUser,
                loginUser,
                loadUser,
                logoutUser
            }}
        >
        { props.children }
        </AuthContext.Provider>    
    )
}

export default AuthState
