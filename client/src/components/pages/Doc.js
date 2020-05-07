import React, { useState, useContext, useEffect } from 'react';
import DocContext from '../../context/Docs/docContext';

const Doc = () => {
    const docContext = useContext(DocContext);
    const{ editDoc, loadDoc } = docContext;

    useEffect({
        loadDoc();
    },[]);
        
    const { currentDocText, currentTitle } = localStorage.getItem('current');
    const [ docText, setdocText ] = useState(currentDocText);
    const [ title, setTitle ] = useState(currentTitle);

    const onChange = (e) => {
        setdocText(e.target.value);
    };
    const onChangeText = (e) => {
        setTitle(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        editDoc({
            title: title,
            docText: docText
        });
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
                        <div class="input-field col s12">
                        <input 
                        name="title" 
                        type="text"
                        value={title}
                        onChange={onChangeText}
                        />
                        </div>
                        <h5><strong>Doc Body</strong></h5>
                        <div className="input-field col s12">
                            <textarea 
                            name="docText" 
                            className="materialize-textarea"
                            style={{padding:"0%"}}
                            value={docText}
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

export default Doc
