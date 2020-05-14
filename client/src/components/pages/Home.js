import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/Auth/authContext';
import NavbarHome from '../layouts/NavbarHome';
import Spinner from '../layouts/Spinner';
import DocContainer from '../doc/DocContainer';

const Home = (props) => {
    
    const authContext = useContext(AuthContext);
    const { user, docList, loadMyDocs, docLoading } = authContext;
    
    useEffect(()=>{
        loadMyDocs();
        localStorage.setItem('current', null);
    },[])

    return (
            <Fragment>
            <NavbarHome/>
            <div className='container'> 
                { docLoading === true ?
                    <Spinner/>
                    :
                    <div className='row'>
                        <DocContainer />
                    </div>
                }
            </div>
            </Fragment>
    )
}

export default Home
