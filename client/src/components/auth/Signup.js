import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/Auth/authContext';

const Signup = (props) => {

    const authContext = useContext(AuthContext);

    const { registerUser, isAuthenticated, loadUser } = authContext;

    

    useEffect(()=>{
        loadUser();

        if(isAuthenticated) {
            props.history.push('/');
        }
        // eslint-disable-next-line
    },[isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
        password2:''
    });

    const { name, email, password, password2 } = user;

    const onSubmit=(e)=>{
        e.preventDefault();
        // alerts
        if(password !== password2) {
            return console.log("Passwords do not match");
        };
        registerUser({
            name,
            email,
            password
        });
        props.history.push('/login')

    };

    const onChange=(e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div className="valign-wrapper" style={{height: "100%", width: "100%", position: "absolute"}}>
        <div className="container">
            <h1 className="center-align">SignUp</h1>

                <a href="/login"> <h6 className="blue-text center-align">Login</h6> </a>
                <br/>

            <form onSubmit={onSubmit}>
                <div className="input-field">
                    <input 
                    type="text"
                    id="name"
                    name='name' 
                    required
                    value={name}
                    onChange={onChange}
                    />

                    <label className="active" htmlFor="name">Name</label>
                </div>

                <div className="input-field">
                    <input 
                    type="email" 
                    id="email"
                    name='email' 
                    required
                    value={email} 
                    onChange={onChange} 
                    />

                    <label className="active" htmlFor="email">Email</label>
                </div>

                <div className="input-field">
                  <input 
                  type="password" 
                  id="password"
                  name='password' 
                  required
                  value={password} 
                  onChange={onChange}
                  />

                  <label className="active" htmlFor="email">Password</label>
                </div>

                <div className="input-field">
                    <input 
                    type="password" 
                    id="password2"
                    name='password2' 
                    required
                    value={password2} 
                    onChange={onChange} 
                    />

                    <label className="active" htmlFor="password2">Confirm Password</label>
                </div>

                <div className="input-field" style={{textAlign: "center", marginBottom: "0px"}}>
                    <button className="btn" type="submit" name="action">SignUp
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
}

export default Signup
