import {
    LOAD_DOC_TITLE,
    LOAD_DOC_TEXT,
    EDIT_DOC
} from '../types';

export default( state, action ) => {
    switch( action.type ) {
        
        case LOAD_DOC_TITLE:
            return{
                ...state,
                docTitle: action.payload
            };

        case LOAD_DOC_TEXT:
            return{
                ...state,
                docText: action.payload
            };

        case EDIT_DOC:
            return{
                ...state
            };
        
        default:
            return state;
    }
}