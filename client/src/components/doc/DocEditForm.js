import React, { useState, useContext, useEffect, Fragment } from 'react';
import DocContext from '../../context/Docs/docContext';

const DocEditForm = () => {
    const docContext = useContext(DocContext);
    const { editDoc, docBody, loadingDocBody } = docContext;
    useEffect(()=>{
        if(!loadingDocBody){
            setDoc({
                text: docBody.text,
                title: docBody.title
            });
        } else {
            setDoc({
                text: "",
                title: ""
            });
        }
    },[])

    const [ doc,setDoc ] = useState({
        text: "",
        title: ""
    });

    const { text, title } = doc;

    const onChange = (e) => {
        setDoc({
            ...doc,
            [ e.target.name ]: e.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        editDoc(doc);
    };

    return (
        <div className='container'>
            <div className="row">
                <form 
                className="col s12"
                onSubmit={onSubmit}
                >
                    <div className="row">
                        <h5><strong>Title</strong></h5>
                        <div className="input-field col s12">
                            <input 
                            name="title" 
                            type="text"
                            value={title}
                            onChange={onChange}
                            />
                        </div>
                        <h5><strong>Doc Body</strong></h5>
                        <div className="input-field col s12">
                            <textarea 
                            name="text" 
                            className="textArea"
                            style={{padding:"0%"}}
                            value={text}
                            onChange={onChange}
                            />
                            
                        </div>
                    </div>
                    <input 
                    value='update'
                    type='submit' 
                    className='btn blue'
                    />
                </form>
            </div>  
        </div> 
    )
}

export default DocEditForm