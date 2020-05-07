import React, { useReducer } from 'react';
import axios from 'axios';
import DocContext from './docContext';
import docReducer from './docReducer';

import {
    LOAD_DOC_TEXT,
    LOAD_DOC_TITLE,
    EDIT_DOC
} from '../types';

const DocState = (props) => {

    const initialState = {
        docTitle: null,
        docText: null
    };

    const [state, dispatch] = useReducer(docReducer, initialState);

    // load doc
    const loadDoc = () => {
        loadDocText();
        loadDocTitle();
    };

    // load doc text
    const  loadDocText = async() => {
        const id = JSON.parse(localStorage.getItem('current'))._id;
        const res = await axios.get(`/api/doc/body/${id}`);

        dispatch({
            type: LOAD_DOC_TEXT,
            payload: res.data
        });
    };

    // load doc title
    const  loadDocTitle = async() => {
        const id = JSON.parse(localStorage.getItem('current'))._id;
        const res = await axios.get(`/api/doc/title/${id}`);

        dispatch({
            type: LOAD_DOC_TITLE,
            payload: res.data
        });
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

    // return --->
    return (
        <DocContext.Provider
            value={{
                docTitle: state.docTitle,
                docText: state.docText,
                loadDoc,
                editDoc
            }}
        >
            {props.children}
        </DocContext.Provider>
    );
};

export default DocState
