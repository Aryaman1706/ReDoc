import React, { useState, useContext, useEffect, Fragment } from "react";
import DocContext from "../../context/Docs/docContext";
import AuthorsItem from "./AuthorsItem";
import Spinner from "../layouts/Spinner";

const AuthorsContainer = () => {
  const docContext = useContext(DocContext);
  const {
    loadAuthors,
    authors,
    loadingAuthors,
    addAuthor,
    authorsList,
  } = docContext;

  useEffect(() => {
    console.log("use effect in authors");
    loadAuthors();
  }, []);

  const [email, setEmail] = useState("");

  const onChange = async (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addAuthor(email);
    setEmail("");
  };

  return (
    <Fragment>
      {loadingAuthors === false ? (
        <div className="container">
          <h5>
            <strong>Authors</strong>
          </h5>
          <div className="row">
            {authors.map((author) => (
              <AuthorsItem author={author} key={author._id} />
            ))}

            {/* ADD AUTHOR */}
            <div className="col s2">
              <div className="card-panel grey" style={{ padding: "7px" }}>
                <form onSubmit={onSubmit}>
                  <input
                    placeholder="email"
                    name="search"
                    type="email"
                    value={email}
                    className="white"
                    onChange={onChange}
                    required
                  />
                  <input type="submit" value="Add" />
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default AuthorsContainer;
