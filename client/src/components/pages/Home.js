import React, { Fragment, useContext, useEffect } from 'react';
import DocContext from '../../context/Docs/docContext';
import AuthContext from '../../context/Auth/authContext';
import DocItem from '../doc/DocItem';

const Home = () => {
    
    const authContext = useContext(AuthContext);
    const docContext = useContext(DocContext);
    const { loadUser } = authContext;
    const { docs, getMyDocs } = docContext;
    
    useEffect(()=>{
        loadUser();
        getMyDocs();
    },[]);

    return (
        <Fragment>
            <div className='container'>
                { docs.map( doc => 
                        <DocItem doc={doc} key={doc._id} />
                )}
            </div>
        </Fragment>
    )
}

export default Home