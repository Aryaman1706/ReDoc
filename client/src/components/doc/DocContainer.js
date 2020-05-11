import React, { useContext, Fragment } from 'react';
import DocItem from '../doc/DocItem';
import AuthContext from '../../context/Auth/authContext';

const DocContainer = () => {
    const authContext = useContext(AuthContext);
    const { docs } = authContext;
    return (
        <Fragment>
            { docs.map( doc => 
                    <DocItem doc={doc} key={doc._id} />
            )}
        </Fragment>
    )
}

export default DocContainer
