import React, { useReducer } from 'react';
import axios from 'axios';
import DocContext from './docContext';
import docReducer from './docReducer';

import {
    LOAD_DOC_BODY,
    EDIT_DOC
} from '../types';

const DocState = (props) => {

    const initialState = {
        docBody: null,
        loadingDocBody: true
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
    }
    
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
                docBody: state.docBody,
                loadingDocBody: state.loadingDocBody,
                loadDocBody,
                editDoc
            }}
        >
            {props.children}
        </DocContext.Provider>
    );
};

export default DocState
