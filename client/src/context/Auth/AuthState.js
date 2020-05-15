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
    UPDATE_USER,
    ADD_DOC,
    LOAD_DOCS,
    SET_LOADING,
    REMOVE_DOCLIST
} from '../types';
import { sign } from 'jsonwebtoken';

const AuthState = (props) => {
    
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        docList: [],
        docs: [],
        docLoading: true
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
        setAuthToken(localStorage.getItem('token'));
        const res = await axios.get('/api/user/me');
        dispatch({
            type: LOAD_USER,
            payload: res.data
        })  
    };

    // update user
    const updateUser = async(formData) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = axios.put(`/api/user/me`, formData, config);

        dispatch({
            type: UPDATE_USER,
            payload: res.data
        })
    };

    // logout user
    const logoutUser = async () => {
        dispatch({
            type: LOGOUT_USER
        });
    };

    // add doc
    const addDoc = async ( formData ) => {
        const res = await axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          dispatch({
              type: ADD_DOC,
              payload: res.data
          })
    };

    // load docs
    const loadMyDocs = async () => {
        state.docList.forEach(
            async doc  => {
                
                let res =  await axios.get(`/api/doc/${doc}`)
                if(res.data){
                    dispatch({
                        type: LOAD_DOCS,
                        payload: res.data
                    })
                } else{
                    console.log(doc);
                    removeDoc(doc);
                }
            }
        )
        dispatch({
            type: SET_LOADING
        })
    };

    // remove doc
    const removeDoc = async (doc) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.put(`/api/user/editMyDocs/${doc}`, null ,config);
        console.log(res.data);
        dispatch({
            type: REMOVE_DOCLIST,
            payload: doc
        })
    }

    // return --->
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                docList: state.docList,
                docs: state.docs,
                docLoading: state.docLoading,
                registerUser,
                loginUser,
                loadUser,
                logoutUser,
                updateUser,
                addDoc,
                loadMyDocs,
                removeDoc
            }}
        >
        { props.children }
        </AuthContext.Provider>    
    )
}

export default AuthState
