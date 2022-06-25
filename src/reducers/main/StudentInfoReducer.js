import {handleActions} from 'redux-actions';
import {StudentInfoActionType} from '../../types';
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
    // 学生列表
    studentArray: [],
    studentItem :{},
    collegeList:[],
    paramCollegeList:[],
    collegeLocateList:[],
    
};
export default handleActions({
    [StudentInfoActionType.setQueryObj]: (state, action) => {
        return {
            ...state,
            queryObj: action.payload
        }
    },
    [StudentInfoActionType.getCollegeLocateList]: (state, action) => {
        return {
            ...state,
            collegeLocateList: action.payload
        }
    },
    [StudentInfoActionType.getParamCollegeList]: (state, action) => {
        return {
            ...state,
            paramCollegeList: action.payload
        }
    },
    [StudentInfoActionType.getCollegeList]: (state, action) => {
        return {
            ...state,
            collegeList: action.payload
        }
    },
    [StudentInfoActionType.getStudentList]: (state, action) => {
        return {
            ...state,
            studentArray: action.payload
        }
    },
    [StudentInfoActionType.setStudentListDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [StudentInfoActionType.setStudentItem]: (state, action) => {
        return {
            ...state,
            studentItem: action.payload
        }
    },
    

}, initialState)