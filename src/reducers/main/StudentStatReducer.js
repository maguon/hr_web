import {handleActions} from 'redux-actions';
import {StudentStatActionType} from '../../types';

const initialState = {
    statStudentByGender: [],
    statStudentByYear: []
};

export default handleActions({
    [StudentStatActionType.getStudentStatByGender]: (state, action) => {
        return {
            ...state,
            statStudentByGender: action.payload
        }
    },
    [StudentStatActionType.getStudentStatByYear]: (state, action) => {
        return {
            ...state,
            statStudentByYear: action.payload
        }
    }
}, initialState)