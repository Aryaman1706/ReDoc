import React, { Fragment, useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/Auth/authContext';
import Navbar from '../layouts/Navbar'

const Profile = (props) => {

    const authContext = useContext(AuthContext);
    const { user, updateUser, loadUser } = authContext;

    useEffect(()=>{
        console.log("use effect from profile");
        if(user){
            setProfile({
                name: user.name,
                email: user.email
            });
        } else {
            setProfile({
                name: "",
                email: ""
            });
        }
    },[])

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
                                placeholder="Name"
                                required
                                value={name}
                                onChange={onChange}
                            />
                            </div>

                            <div className="input-field">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={onChange}
                            />
                            </div>

                            <div className="input-field" style={{textAlign: "center", marginBottom:"0px"}}>
                                <button className="blue btn" type="submit">
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        </Fragment>
    )
}

export default Profile
