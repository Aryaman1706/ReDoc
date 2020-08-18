import React, { useContext } from "react";
import AuthContext from "../../context/Auth/authContext";
import { Link } from "react-router-dom";

const DocItem = (props) => {
  const authContext = useContext(AuthContext);
  const { removeDoc } = authContext;
  const { title, date, _id } = props.doc;
  const onOpen = () => {
    localStorage.setItem("current", JSON.stringify(props.doc));
  };
  const onDelete = () => {
    removeDoc(_id);
  };

  return (
    <div className="col s4">
      <div className="card-panel grey">
        <h4 className="white-text truncate">{title}</h4>
        <p className="white-text">{date}</p>
        <Link className="white-text btn blue" to="/doc" onClick={onOpen}>
          Open
        </Link>
        <a
          className="white-text btn red"
          style={{ marginLeft: "5px" }}
          onClick={onDelete}
        >
          Delete
        </a>
      </div>
    </div>
  );
};

export default DocItem;
