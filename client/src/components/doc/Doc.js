import React, { useState, useContext, useEffect, Fragment } from 'react';
import DocContext from '../../context/Docs/docContext';
import Navbar from '../layouts/Navbar';
import Spinner from '../layouts/Spinner';
import DocEditForm from './DocEditForm';

const Doc = () => {
    const docContext = useContext(DocContext);
    const { loadDocBody, docBody, loadingDocBody } = docContext;
    useEffect(()=>{
        loadDocBody();
    },[])

    const [ doc,setDoc ] = useState({
        text: "",
        title: ""
    });
    
    return (
        <Fragment>
            <Navbar/>
            { loadingDocBody === false ? <DocEditForm /> : <Spinner /> } 
        </Fragment>
    )
}

export default Doc

        