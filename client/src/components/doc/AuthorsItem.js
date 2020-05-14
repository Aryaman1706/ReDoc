import React, { useState, useContext, useEffect, Fragment } from 'react';
import DocContext from '../../context/Docs/docContext';

const AuthorsItem = ({ author }) => {
    const { name, email } = author;
    
    const docContext = useContext(DocContext);
    const { deleteAuthor } = docContext;

    const onDelete = async() => {
        deleteAuthor(author);
    };

    return (
        <Fragment>
            <div className='col s2'>
                <div className='card-panel grey' style={{ padding: "5px" }}>
                    <p className="white-text truncate" style={{margin: "2px"}}>{name}</p>
                    <p className="white-text" style={{margin: "2px"}}>{email}</p>
                    <a href="#!"  onClick={onDelete} className="red-text"><i className="material-icons">delete</i></a>
                </div>
            </div>
        </Fragment>
    )
}

export default AuthorsItem
