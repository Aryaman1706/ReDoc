import {
    LOAD_DOC_BODY,
    EDIT_DOC,
    LOAD_AUTHORS,
    DELETE_AUTHOR,
    ADD_AUTHOR
} from '../types';

export default( state, action ) => {
    switch( action.type ) {
        
        case LOAD_DOC_BODY:
            return{
                ...state,
                docBody: action.payload,
                authorsList: action.payload.authorsList,
                loadingDocBody: false
            };
    
        case EDIT_DOC:
            return{
                ...state
            };
        
        case LOAD_AUTHORS:
            return{
                ...state,
                authors: [ action.payload, ...state.authors ],
                loadingAuthors: false
            }

        case DELETE_AUTHOR:
            return{
                ...state
            }

        case ADD_AUTHOR:
            return{
                ...state,
                authorsList:[ action.payload._id ,...state.authors ],
                authors: [ action.payload , ...state.authors ]
            }
        
        default:
            return state;
    }
}