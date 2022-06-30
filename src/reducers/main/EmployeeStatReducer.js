import {handleActions} from 'redux-actions';
import {EmployeeStatActionType} from '../../types';

const initialState = {
    statEmployeeByPosType: [],
    statEmployeeByComType: [],
    statEmployeeByDegree: [],
    statEmployeeByGender: [],
    statEmployeeByYear: []
};

export default handleActions({
    [EmployeeStatActionType.getEmployeeStatByGender]: (state, action) => {
        return {
            ...state,
            statEmployeeByGender: action.payload
        }
    },
    [EmployeeStatActionType.getEmployeeStatByYear]: (state, action) => {
        return {
            ...state,
            statEmployeeByYear: action.payload
        }
    },
    [EmployeeStatActionType.getEmployeeStatByComType]: (state, action) => {
        return {
            ...state,
            statEmployeeByComType: action.payload
        }
    },
    [EmployeeStatActionType.getEmployeeStatByPosType]: (state, action) => {
        return {
            ...state,
            statEmployeeByPosType: action.payload
        }
    },
    [EmployeeStatActionType.getEmployeeStatByDegree]: (state, action) => {
        return {
            ...state,
            statEmployeeByDegree: action.payload
        }
    }
}, initialState)