import Swal from 'sweetalert2';
import {apiHost, hiddenUserType} from '../../config';
import {AppActionType, AuthoritySettingActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtils');
const localUtil = require('../../utils/LocalUtils');
const commonUtil = require('../../utils/CommonUtil');
const sysConst = require('../../utils/SysConst');

// 系统设置 -> 权限设置 取得用户群组列表
export const getUserGroupList = () => async (dispatch, getState) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/userTypeList';

        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpGet(url);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success) {
            let roles = [];
            let hiddenFlag;
            res.rows.forEach((item) => {
                hiddenFlag = false;
                for (let i = 0; i < hiddenUserType.length; i++) {
                    if (item.id == hiddenUserType[i]) {
                        hiddenFlag = true;
                        break;
                    }
                }
                if (!hiddenFlag) {
                    roles.push(item);
                }
            });

            dispatch({type: AuthoritySettingActionType.setUserGroupList, payload: roles});
        } else if (!res.success) {
            Swal.fire('获取用户群组信息失败', res.msg, 'warning');
        }
    } catch (err) {
        Swal.fire('操作失败', err.message, 'error');
    }
};

// 系统设置 -> 权限设置 取得画面选择群组权限
export const getMenuList = (conditionUserType) => async (dispatch, getState) => {
    try {
        // 检索条件：用户类型
        let type = conditionUserType === null ? '-1' : conditionUserType.value;

        // 基本检索URL
        let url = apiHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/type/' + type;
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpGet(url);
        dispatch({type: AppActionType.showLoadProgress, payload: false});

        if (res.success) {
            if (res.rows.length > 0){
                dispatch({type: AuthoritySettingActionType.setCurrentRemark, payload: res.rows[0].remarks});
                dispatch({type: AuthoritySettingActionType.setMenuList, payload: commonUtil.objToMap(res.rows[0].menu_list)});
                // dispatch({type: AuthoritySettingActionType.setMenuList, payload: commonUtil.objToMap(sysConst.ALL_PAGE_JSON)});
            }else {
                dispatch({type: AuthoritySettingActionType.setCurrentRemark, payload: ''});
                dispatch({type: AuthoritySettingActionType.setMenuList, payload: new Map()});
            }
        } else if (!res.success) {
            Swal.fire('获取菜单权限信息失败', res.msg, 'warning');
        }
    } catch (err) {
        Swal.fire('操作失败', err.message, 'error');
    }
};

// 系统设置 -> 权限设置 新增用户群组
export const createUserGroup = (params) => async (dispatch, getState) => {
    try {
        // 基本url
        let url = apiHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + "/typeMenu";
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        let res = await httpUtil.httpPost(url, params);
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success) {
            // 更新select框 数据
            dispatch(getUserGroupList());
            Swal.fire("保存成功", "", "success");
        } else if (!res.success) {
            Swal.fire('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        Swal.fire('操作失败', err.message, 'error');
    }
};

// 系统设置 -> 权限设置 修改权限设置
export const changeMenuList = (key, checked) => async (dispatch, getState) => {
    try {
        // 当前权限菜单
        let menuMap = getState().AuthoritySettingReducer.currentMenu;
        if (checked) {
            menuMap.set(key,{"usable": true});
        } else {
            menuMap.delete(key);
        }
        dispatch({type: AuthoritySettingActionType.setMenuList, payload: menuMap});
    } catch (err) {
        Swal.fire('操作失败', err.message, 'error');
    }
};

// 系统设置 -> 权限设置 保存权限
export const saveMenu = (currentUserType) => async (dispatch, getState) => {
    try {
        // 备注
        const remarks = getState().AuthoritySettingReducer.currentRemark;
        // 当前权限菜单
        const currentMenu = getState().AuthoritySettingReducer.currentMenu;

        const params = {
            id: currentUserType === null ? '' : currentUserType.value,
            typeName: currentUserType === null ? '' : currentUserType.label,
            menuList: commonUtil.mapToObj(currentMenu),
            remarks: remarks
        };
        // 基本url
        let url = apiHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + "/typeMenu";
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        let res = await httpUtil.httpPost(url, params);
        dispatch({type: AppActionType.showLoadProgress, payload: false});

        if (res.success) {
            Swal.fire("保存成功", "", "success");
        } else if (!res.success) {
            Swal.fire('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        Swal.fire('操作失败', err.message, 'error');
    }
};

export const deleteUserType = (id) => async (dispatch, getState) => {
    try {
        const url = apiHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/type/' + id;
        dispatch({type: AppActionType.showLoadProgress, payload: true});
        const res = await httpUtil.httpDelete(url, {});
        dispatch({type: AppActionType.showLoadProgress, payload: false});
        if (res.success) {
            Swal.fire("删除成功", "", "success");
            // 取得用户群组列表
            dispatch(getUserGroupList());
            // 清空权限
            dispatch({type: AuthoritySettingActionType.setMenuList, payload: []});
            // 清空备注
            dispatch({type: AuthoritySettingActionType.setCurrentRemark, payload: ''});
            return true;
        } else if (!res.success) {
            Swal.fire('删除失败', res.msg, 'warning');
            return false;
        }
    } catch (err) {
        Swal.fire("操作失败", err.message, "error");
    }
};