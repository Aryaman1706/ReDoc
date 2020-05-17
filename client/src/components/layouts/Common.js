import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/Auth/authContext';

const Common = () => {
    const authContext = useContext(AuthContext);
    const { user, docList, loadUser, loadMyDocs, loading, isAuthenticated } = authContext;

    useEffect(()=>{
        console.log("use effec for load user")
        loadUser();
        // eslint-disable-next-line
    },[isAuthenticated]);

    useEffect(()=>{
        console.log("use effect in common");
        console.log(loading, docList)
        console.log(user)
        loadMyDocs();
    },[loading])

    return (
        <div></div>
    )
}

export default Common
