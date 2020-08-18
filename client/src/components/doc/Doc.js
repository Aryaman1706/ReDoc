import React, { useState, useContext, useEffect, Fragment } from "react";
import DocContext from "../../context/Docs/docContext";
import Navbar from "../layouts/Navbar";
import Spinner from "../layouts/Spinner";
import DocEditForm from "./DocEditForm";
import AuthorsContainer from "./AuthorsContainer";

const Doc = () => {
  const docContext = useContext(DocContext);
  const { loadDocBody, docBody, loadingDocBody } = docContext;
  useEffect(() => {
    loadDocBody();
  }, []);

  return (
    <Fragment>
      <Navbar />
      {loadingDocBody === false ? (
        <Fragment>
          <AuthorsContainer />
          <DocEditForm />
        </Fragment>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Doc;
