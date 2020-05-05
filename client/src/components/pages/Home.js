import React, { Fragment, useContext, useEffect } from 'react';
import DocContext from '../../context/Docs/docContext';
import AuthContext from '../../context/Auth/authContext';

const Home = () => {
    
    const authContext = useContext(AuthContext);
    const docContext = useContext(DocContext);
    const { loadUser } = authContext;
    const { docs, getMyDocs } = docContext;
    
    useEffect(()=>{
        loadUser();
        getMyDocs();
    });

    return (
        <Fragment>
            <div style={{backgroundColor:'black'}}>
                { docs.map( doc => 
                        <DocItem doc={doc} key={doc._id} />
                )}
            </div>
        </Fragment>
    )
}

export default Home