import {createAction} from 'redux-actions';

export const getEmployeeStatByYear = createAction('GET_EMPLOYEE_STAT_BY_YEAR');
export const getEmployeeStatByGender = createAction('GET_EMPLOYEE_STAT_BY_GENDER');
export const getEmployeeStatByDegree = createAction('GET_EMPLOYEE_STAT_BY_DEGREE');
export const getEmployeeStatByPosType = createAction('GET_EMPLOYEE_STAT_BY_POSTYPE');
export const getEmployeeStatByComType = createAction('GET_EMPLOYEE_STAT_BY_COMTYPE');