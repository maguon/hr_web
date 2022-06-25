import {handleActions} from 'redux-actions';
import {EmployeeInfoActionType} from '../../types';
const initialState = {
    //查询条件
    queryObj:{
        name:'',
        collegeName:'',
        collegeYear:'',
        marjorName:'',
        idNum:'',
        phone :'',
        gender :'',
        start :0
    },
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,
    // 在职人员列表
    employeeArray: [],
    employeeItem :{},
    collegeList:[],
    paramCollegeList:[],
    collegeLocateList:[],
    
};
export default handleActions({
    [EmployeeInfoActionType.setQueryObj]: (state, action) => {
        return {
            ...state,
            queryObj: action.payload
        }
    },
    [EmployeeInfoActionType.getCollegeLocateList]: (state, action) => {
        return {
            ...state,
            collegeLocateList: action.payload
        }
    },
    [EmployeeInfoActionType.getParamCollegeList]: (state, action) => {
        return {
            ...state,
            paramCollegeList: action.payload
        }
    },
    [EmployeeInfoActionType.getCollegeList]: (state, action) => {
        return {
            ...state,
            collegeList: action.payload
        }
    },
    [EmployeeInfoActionType.getEmployeeList]: (state, action) => {
        return {
            ...state,
            employeeArray: action.payload
        }
    },
    [EmployeeInfoActionType.setEmployeeListDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [EmployeeInfoActionType.setEmployeeItem]: (state, action) => {
        return {
            ...state,
            employeeItem: action.payload
        }
    },
    

}, initialState)
