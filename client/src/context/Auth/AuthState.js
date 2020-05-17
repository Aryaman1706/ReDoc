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
    REMOVE_DOCLIST,
    EXCLUDE_DOC,
    DOWNLOAD,
    DELETE_AUTHOR,
    DELETE_DOC
} from '../types';

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
        dispatch( {
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

        const res = await axios.put(`/api/user/me`, formData, config);
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
        console.log("add doc")
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
        console.log("loadmydocs called");
        console.log(state.docList);
        state.docList.forEach(
            async doc  => {
                
                let res =  await axios.get(`/api/doc/${doc}`);
                if(res.data === "no doc found"){
                   console.log(doc);
                    excludeDoc(doc);
                } 
                else{
                    dispatch({
                        type: LOAD_DOCS,
                        payload: res.data
                    })
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
        const res = await axios.put(`/api/doc/removeAuthor/${doc}`, { 'email': state.user.email } ,config);
        if(res.data === "delete"){
            deleteDoc (doc);
        } else{
            dispatch({
                type: REMOVE_DOCLIST,
                payload: doc
            })
        }
    }

    // excludeDoc
    const excludeDoc = async ( doc ) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put(`api/user/editMyDocs/${doc}`, null, config);
        dispatch({
            type: EXCLUDE_DOC,
            payload: doc
        })
    }

    // download file
    const download = async( id ) => {
        const res = await axios.get(`/api/download/${id}`);
        console.log(res.data);
        dispatch({
            type: DOWNLOAD
        })
    }

    // delete doc
    const deleteDoc = async (doc) => {
        const res = await axios.delete(`/api/doc/${doc}`);
        dispatch({
            type: DELETE_DOC,
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
                removeDoc,
                download
            }}
        >
        { props.children }
        </AuthContext.Provider>    
    )
}

export default AuthState