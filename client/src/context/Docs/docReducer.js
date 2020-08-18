import {
  LOAD_DOC_BODY,
  EDIT_DOC,
  LOAD_AUTHORS,
  DELETE_AUTHOR,
  ADD_AUTHOR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_DOC_BODY:
      return {
        ...state,
        docBody: action.payload,
        authorsList: action.payload.authorsList,
        loadingDocBody: false,
      };

    case EDIT_DOC:
      return {
        ...state,
      };

    case LOAD_AUTHORS:
      return {
        ...state,
        authors: [action.payload, ...state.authors],
        loadingAuthors: false,
      };

    case DELETE_AUTHOR:
      return {
        ...state,
        authors: state.authors.filter((x) => x._id !== action.payload),
      };

    case ADD_AUTHOR:
      return {
        ...state,
        authors: [action.payload, ...state.authors],
      };

    default:
      return state;
  }
};
