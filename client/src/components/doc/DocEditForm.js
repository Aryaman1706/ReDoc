import React, { useState, useContext, useEffect, Fragment } from 'react';
import DocContext from '../../context/Docs/docContext';

const DocEditForm = () => {
    const docContext = useContext(DocContext);
    const { loadDocBody, docBody, loadingDocBody } = docContext;
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
    return (
        <div className='container'>
            <div className="row">
                <form 
                className="col s12"
                // onSubmit={onSubmit}
                >
                    <div className="row">
                        <h5><strong>Title</strong></h5>
                        <div className="input-field col s12">
                            <input 
                            name="title" 
                            type="text"
                            value={title}
                            // onChange={onChangeText}
                            />
                        </div>
                        <h5><strong>Doc Body</strong></h5>
                        <div className="input-field col s12">
                            <textarea 
                            name="docText" 
                            className="materialize-textarea"
                            style={{padding:"0%"}}
                            value={text}
                            // onChange={onChange}
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