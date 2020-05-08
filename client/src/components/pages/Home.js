import React, { Fragment, useContext, useEffect } from 'react';
import DocContext from '../../context/Docs/docContext';
import AuthContext from '../../context/Auth/authContext';
import DocItem from '../doc/DocItem';
import Navbar from '../layouts/Navbar';

const Home = (props) => {
    
    const authContext = useContext(AuthContext);
    // const docContext = useContext(DocContext);
    const { loadUser, user, isAuthenticated } = authContext;
    // const { getMyDocs } = docContext;
    
    useEffect(()=>{
        loadUser();
        console.log("home reload");
        // getMyDocs();
    },[ localStorage.getItem('token'), props.history ]);

    return (
        <Fragment>
            <Navbar/>
            <div className='container'>
                {/* { docs.map( doc => 
                        <DocItem doc={doc} key={doc._id} />
                )} */}
            </div>
        </Fragment>
    )
}

export default Home