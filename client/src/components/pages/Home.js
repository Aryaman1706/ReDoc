import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/Auth/authContext';
import DocItem from '../doc/DocItem';
import NavbarHome from '../layouts/NavbarHome';

const Home = (props) => {
    
    const authContext = useContext(AuthContext);
    const { loadUser, user, docs, loadMyDocs } = authContext;
    
    useEffect(()=>{
        loadUser();
        loadMyDocs();
        console.log("use Effect in home");
    },[ localStorage.getItem('token'), props.history ]);

    return (
            <Fragment>
            <NavbarHome/>
            <div className='container'>
                <div className='row'>
                    { docs.map( doc => 
                            <DocItem doc={doc} key={doc._id} />
                    )}
                </div>
            </div>
            </Fragment>
    )
}

export default Home