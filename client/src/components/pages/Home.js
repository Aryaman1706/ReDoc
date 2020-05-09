import React, { Fragment, useContext, useEffect } from 'react';
import DocContext from '../../context/Docs/docContext';
import AuthContext from '../../context/Auth/authContext';
import AuthState from '../../context/Auth/AuthState';
import DocItem from '../doc/DocItem';
import Navbar from '../layouts/Navbar';
import Spinner from '../layouts/Spinner';

const Home = (props) => {
    
    const authContext = useContext(AuthContext);
    const { loadUser, user, docs } = authContext;
    
    useEffect(()=>{
        loadUser();
        console.log("use Effect in home");
    },[ localStorage.getItem('token'), props.history ]);

    return (
            <Fragment>
            <Navbar/>
            <div className='container'>
                <div className='row'>
                    { docs.map( doc => 
                            <DocItem doc={doc} key={doc} />
                    )}
                </div>
            </div>
            </Fragment>
    )
}

export default Home