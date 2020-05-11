import {
    LOAD_DOC_BODY,
    EDIT_DOC
} from '../types';

export default( state, action ) => {
    switch( action.type ) {
        
        case LOAD_DOC_BODY:
            return{
                ...state,
                docBody: action.payload,
                loadingDocBody: false
            };
    
        case EDIT_DOC:
            return{
                ...state
            };
        
        default:
            return state;
    }
}