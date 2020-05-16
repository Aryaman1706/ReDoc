import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/Auth/authContext';

const Common = () => {
    const authContext = useContext(AuthContext);
    const { user, logoutUser, loadUser, loadMyDocs, loading } = authContext;

    useEffect(()=>{
        console.log("use effect in nabar home");
        loadUser();
        // eslint-disable-next-line
    },[]);

    return (
        <div></div>
    )
}

export default Common
