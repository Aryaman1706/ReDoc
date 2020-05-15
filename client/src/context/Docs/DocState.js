import React, { useReducer } from 'react';
import axios from 'axios';
import DocContext from './docContext';
import docReducer from './docReducer';

import {
    LOAD_DOC_BODY,
    EDIT_DOC,
    LOAD_AUTHORS,
    DELETE_AUTHOR,
    ADD_AUTHOR
} from '../types';

const DocState = (props) => {

    const initialState = {
        docBody: null,
        authorsList: [],
        loadingDocBody: true,
        authors: [],
        loadingAuthors: true
    };

    const [state, dispatch] = useReducer(docReducer, initialState);

    // load doc body
    const loadDocBody = async() => {
        const id = JSON.parse(localStorage.getItem('current'))._id;
        const res = await axios.get(`/api/doc/body/${id}`);
        dispatch({
            type: LOAD_DOC_BODY,
            payload: res.data
        })
    };
    
    // edit doc
    const editDoc = async(formData) => {
        const id = JSON.parse(localStorage.getItem('current'))._id;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = axios.put(`/api/doc/${id}`,
        formData,
        config );

        dispatch({
            type: EDIT_DOC,
            payload: res.data
        });
    };

    // load authors
    const loadAuthors = async () => {
        state.authorsList.forEach( 
            async author => {
                let res = await axios.get(`/api/user/${author}`);
                dispatch({
                    type: LOAD_AUTHORS,
                    payload: res.data
                })
            }
        )
    };

    const deleteAuthor = async ( author ) => {
        const id = JSON.parse(localStorage.getItem('current'))._id;
        const email = author.email;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put(`/api/doc/removeAuthor/${id}`, {'email':email}, config);
        dispatch({
            type: DELETE_AUTHOR,
            payload: author._id
        })
    };

    const addAuthor = async ( email ) => {
        const id = JSON.parse(localStorage.getItem('current'))._id;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.put (`/api/doc/addAuthor/${id}`, {'email': email}, config);
        dispatch({
            type: ADD_AUTHOR,
            payload: res.data
        })
    };
 
    // return --->
    return (
        <DocContext.Provider
            value={{
                docBody: state.docBody,
                authorsList: state.authorsList,
                loadingDocBody: state.loadingDocBody,
                authors: state.authors,
                loadingAuthors: state.loadingAuthors,
                deleteAuthor,
                loadDocBody,
                loadAuthors,
                editDoc,
                addAuthor
            }}
        >
            {props.children}
        </DocContext.Provider>
    );
};

export default DocState
