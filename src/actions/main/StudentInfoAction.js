import Swal from 'sweetalert2';
import {apiHost} from '../../config/index';
import { AppActionType, StudentInfoActionType} from '../../types';
const httpUtil = require('../../utils/HttpUtils');
const localUtil = require('../../utils/LocalUtils');
const sysConst = require('../../utils/SysConst');
// 学生管理 取得画面列表
export const getStudentList = () => async (dispatch, getState) => {
    try {
        // 检索条件：每页数量
        const size = getState().StudentInfoReducer.size;
        // 检索条件
       const paramsObj=getState().StudentInfoReducer.queryObj;
        // 基本检索URL
        let url = apiHost + '/api/user/'+localUtil.getSessionItem(sysConst.LOGIN_USER_ID)+'/student?size=' + size;
        let conditions = httpUtil.objToUrl(paramsObj);
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success === true) {
            dispatch({type: StudentInfoActionType.setStudentListDataSize, payload: res.rows.length});
            dispatch({type: StudentInfoActionType.getStudentList, payload: res.rows.slice(0, size - 1)});
        } else if (res.success === false) {
             Swal.fire('获取学生列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
         Swal.fire('操作失败', err.message, 'error');
    }
};
export const getCollegeLocateList = () => async (dispatch, getState) => {
    try {
       
        // 基本检索URL
        let url = apiHost + '/api/user/'+localUtil.getSessionItem(sysConst.LOGIN_USER_ID)+'/collegeLocate';
        
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        // 检索URL
       
        const res = await httpUtil.httpGet(url);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success === true) {
            dispatch({type: StudentInfoActionType.getCollegeLocateList, payload: res.rows});
        } else if (res.success === false) {
             Swal.fire('获取学校属地列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
         Swal.fire('操作失败', err.message, 'error');
    }
}
export const getCollegeList = (paramsObj) => async (dispatch, getState) => {
    try {
       
        // 基本检索URL
        let url = apiHost + '/api/user/'+localUtil.getSessionItem(sysConst.LOGIN_USER_ID)+'/college?';
        let conditions = httpUtil.objToUrl(paramsObj);
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success === true) {
            dispatch({type: StudentInfoActionType.getCollegeList, payload: res.rows});
        } else if (res.success === false) {
             Swal.fire('获取学校列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
         Swal.fire('操作失败', err.message, 'error');
    }
};
export const getParamCollegeList = (paramsObj) => async (dispatch, getState) => {
    try {
       
        // 基本检索URL
        let url = apiHost + '/api/user/'+localUtil.getSessionItem(sysConst.LOGIN_USER_ID)+'/college?';
        let conditions = httpUtil.objToUrl(paramsObj);
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success === true) {
            dispatch({type: StudentInfoActionType.getParamCollegeList, payload: res.rows});
        } else if (res.success === false) {
             Swal.fire('获取学校列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
         Swal.fire('操作失败', err.message, 'error');
    }
};
// 
export const addStudent = (params) => async (dispatch) => {
    try {
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpPost(apiHost + '/api/user/'+localUtil.getSessionItem(sysConst.LOGIN_USER_ID)+'/student', params);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success === true&&res.rows.length!==0) {
            dispatch(getStudentList());
            Swal.fire("增加成功", "", "success");
        } else if(res.success === true&&res.rows.length==0){
            Swal.fire("考生号或身份证号相同,增加失败", "", "warning");
        } else if (res.success === false) {
            Swal.fire('增加失败', res.msg, 'warning');
        }
    } catch (err) {
        Swal.fire('操作失败', err.message, 'error');
    }
};

export const getStudentById = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/user/'+localUtil.getSessionItem(sysConst.LOGIN_USER_ID)+'/student?id='+ id;
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpGet(url);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success === true) {
            if (res.rows.length > 0) {
                dispatch({type: StudentInfoActionType.setStudentItem, payload: res.rows});
            }
        } else if (res.success === false) {
            Swal.fire('获取学生详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        Swal.fire('操作失败', err.message, 'error');
    }
};

export const updateStudentInfo = (params,id) => async (dispatch) => {
    try {
        let url = apiHost + '/api/user/'+localUtil.getSessionItem(sysConst.LOGIN_USER_ID)+'/student/'+ id;
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpPut(url, params);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success === true) {
            dispatch(getStudentList());
            Swal.fire("修改成功", "", "success");
        } else if (res.success === false) {
            Swal.fire('修改失败', res.msg, 'warning');
        }
    } catch (err) {
        Swal.fire('操作失败', err.message, 'error');
    }
};
