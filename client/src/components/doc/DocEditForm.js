import React, { useState, useContext, useEffect, Fragment } from 'react';
import DocContext from '../../context/Docs/docContext';
import AuthContext from '../../context/Auth/authContext';
import io from 'socket.io-client';

let socket;

const DocEditForm = () => {
    const docContext = useContext(DocContext);
    const authContext = useContext(AuthContext);
    const { editDoc, docBody, loadingDocBody, loadDocBody } = docContext;
    const { user } = authContext;
    const doc_id = JSON.parse(localStorage.getItem('current'))._id;
    
    const ENDPOINT = "http://localhost";

    useEffect(()=>{
        
        socket = io(ENDPOINT)
        
        console.log("use effect of edit");
        
        socket.emit('join', doc_id );
        
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

        socket.on('textChangeClient', (data) => {
            console.log("hey i got data");
            console.log(data);
            setDoc({
                text : data.text,
                title: data.title
            })
        });

        
     
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
        socket.emit( 'textChangeServer', (doc) );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        editDoc(doc);
    };

    return (
        <Fragment>
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
        </Fragment>
    )
}

export default DocEditForm