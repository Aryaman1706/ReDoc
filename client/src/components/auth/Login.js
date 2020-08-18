import React, { useReducer, useState, useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/authContext";

const Login = (props) => {
  const authContext = useContext(AuthContext);

  const { loginUser, isAuthenticated, loadUser } = authContext;

  useEffect(() => {
    loadUser();

    if (isAuthenticated) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser({
      email,
      password,
    });
  };

  return (
    <div
      className="valign-wrapper"
      style={{ height: "100%", width: "100%", position: "absolute" }}
    >
      <div className="container">
        <h1 className="center-align">Login</h1>
        <a href="/signup">
          {" "}
          <h6 className="blue-text center-align"> Signup </h6>{" "}
        </a>
        <br />

        <form onSubmit={onSubmit}>
          <div className="input-field">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
            <label className="active" htmlFor="email">
              Email
            </label>
          </div>

          <div className="input-field">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
            />
            <label className="active" htmlFor="email">
              Password
            </label>
          </div>

          <div
            className="input-field"
            style={{ textAlign: "center", marginBottom: "0px" }}
          >
            <button className="btn blue" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
