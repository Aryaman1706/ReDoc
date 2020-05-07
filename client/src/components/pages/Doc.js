import React, { useState, useContext, useEffect } from 'react';
import DocContext from '../../context/Docs/docContext';
import DocState from '../../context/Docs/DocState';
import Spinner from '../layouts/Spinner';

const Doc = () => {
    const docContext = useContext(DocContext);
    const { editDoc, loadDoc, docTitle, docText } = docContext;

    useEffect(()=>{
        loadDoc();
        // eslint-disable-next-line
    },[]);
        
    const [ text, setText ] = useState(docText);
    const [ title, setTitle ] = useState(docTitle);

    const onChange = (e) => {
        setText(e.target.value);
    };
    const onChangeText = (e) => {
        setTitle(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        editDoc({
            docTitle: title,
            docText: text
        });
    };
    return (
        <DocState>
            <div className='container'>
            { docText && docTitle ?
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
                :
                <Spinner />
            }
                
            </div>
        </DocState>
    )
}

export default Doc
