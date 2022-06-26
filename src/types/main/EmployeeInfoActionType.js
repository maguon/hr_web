import {createAction} from 'redux-actions';
export const getEmployeeList = createAction('GET_EMPLOYEE_LIST');
export const setQueryObj= createAction('GET_QUERY_OBJ');
export const setEmployeeListDataSize = createAction('SET_EMPLOYEE_LIST_DATA_SIZE');
export const setEmployeeItem = createAction('SET_EMPLOYEE_ITEM');
export const getCollegeList = createAction('GET_COLLEGE_LIST');
export const getParamCollegeList = createAction('GET_PARAM_COLLEGE_LIST');
export const getCollegeLocateList = createAction('GET_COLLEGE_LOCATE_LIST');
export const getNationList = createAction('GET_NATION_LIST');
export const getCompanyNameList = createAction('GET_COMPANY_NAME_LIST');
export const getPosNameList = createAction('GET_POS_NAME_LIST');
