import {createAction} from 'redux-actions';
export const getStudentList = createAction('GET_STUDENT_LIST');
export const setQueryObj= createAction('GET_QUERY_OBJ');
export const setStudentListDataSize = createAction('SET_STUDENT_LIST_DATA_SIZE');
export const setStudentItem = createAction('SET_STUDENT_ITEM');
export const getCollegeList = createAction('GET_COLLEGE_LIST');
export const getParamCollegeList = createAction('GET_PARAM_COLLEGE_LIST');
export const getCollegeLocateList = createAction('GET_COLLEGE_LOCATE_LIST');
