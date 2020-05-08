import React, { Fragment, useContext, useEffect } from 'react';
import DocContext from '../../context/Docs/docContext';
import AuthContext from '../../context/Auth/authContext';
import AuthState from '../../context/Auth/AuthState';
import DocItem from '../doc/DocItem';
import Navbar from '../layouts/Navbar';
import Spinner from '../layouts/Spinner';

const Home = (props) => {
    
    const authContext = useContext(AuthContext);
    const { loadUser, user, isAuthenticated } = authContext;
    
    useEffect(()=>{
        loadUser();
        console.log("home reload");
    },[ localStorage.getItem('token'), props.history ]);

    return (
        <AuthState>
            {user ?
                <Fragment>
                <Navbar/>
                <div className='container'>
                    {/* { docs.map( doc => 
                            <DocItem doc={doc} key={doc._id} />
                    )} */}
                </div>
                </Fragment>
                :
                <Spinner />
            }
        </AuthState>
    )
}

export default Home