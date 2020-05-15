import React, { useContext } from 'react';
import AuthContext from '../../context/Auth/authContext';

const DocItem = (props) => {
    const authContext = useContext(AuthContext);
    const { removeDoc } = authContext;
    const { title, date, _id } = props.doc
    const onOpen = () => {
        localStorage.setItem('current',JSON.stringify(props.doc));
    };
    const onDelete = () => {
        removeDoc(_id);
    };

    return (
        <div className='col s4'>
            <div className='card-panel grey'>
                <h4 className="white-text truncate">{title}</h4>
                <p className="white-text">{date}</p>
                <a 
                    className='white-text btn blue'
                    href='./doc' 
                    onClick={onOpen}
                >
                Open</a>
                <a 
                    className='white-text btn red'
                    style={{marginLeft:"5px"}}
                    onClick={onDelete}
                >
                Delete</a>
            </div>
        </div>
    )
}

export default DocItem