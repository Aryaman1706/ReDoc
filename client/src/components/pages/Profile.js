import React, { Fragment, useContext, useState, useEffect } from 'react';
import Navbar from '../layouts/Navbar';
import AuthContext from '../../context/Auth/authContext';

const Profile = (props) => {

    const authContext = useContext(AuthContext);
    const { user, updateUser, loadUser } = authContext;
    
    // useEffect(()=>{
    //     loadUser();
    // },[ localStorage.getItem('token') ]);

    const [ profile, setProfile ] = useState({
        name: "",
        email: ""
    });

    const { name, email } = profile;

    const onChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        })
    };

    const onSubmit =(e) => {
        e.preventDefault();
        updateUser(profile);
        props.history.push('/');
    };

    return (
        <Fragment>
            <Navbar />
            { user ?  
                <div className="valign-wrapper" style={{height:"80%", width: "100%", position:"absolute"}}>
                    <div className="container">
                        <h1 className="center-align">Profile</h1>
                        <br/>
                        <form
                            onSubmit={onSubmit}
                        >
                            <div className="input-field">
                            <input
                                type="text"
                                name="name"
                                required
                                value={name}
                                onChange={onChange}
                            />
                            <label className="active">Name</label>
                            </div>

                            <div className="input-field">
                            <input
                                type="email"
                                name="email"
                                required
                                value={email}
                                onChange={onChange}
                            />
                            <label className="active">Email</label>
                            </div>

                            <div className="input-field" style={{textAlign: "center", marginBottom:"0px"}}>
                                <button className="blue btn" type="submit">
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                :
                null
            }
        </Fragment>
    )
}

export default Profile
