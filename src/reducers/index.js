import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';
import AppReducer from './layout/AppReducer';
import CommonReducer from './layout/CommonReducer';
import LoginReducer from './login/LoginReducer';
import MainPanelReducer from './main/MainPanelReducer';
import AuthoritySettingReducer from './main/AuthoritySettingReducer';
import AdminUserSettingReducer from "./main/AdminUserSettingReducer";
import AppSettingReducer from "./main/AppSettingReducer";
import UpLoadFileReducer from './main/UpLoadFileReducer';
import UserPerfLevelReducer from './main/UserPerfLevelReducer';
import StudentInfoReducer from './main/StudentInfoReducer';
import EmployeeInfoReducer from './main/EmployeeInfoReducer';
import StudentStatReducer from './main/StudentStatReducer';
import EmployeeStatReducer from './main/EmployeeStatReducer';
export default combineReducers({
    form: reduxFormReducer,
    AppReducer,
    CommonReducer,
    LoginReducer,
    MainPanelReducer,
    AuthoritySettingReducer,
    AdminUserSettingReducer,
    AppSettingReducer,
    UpLoadFileReducer,
    UserPerfLevelReducer,
    StudentInfoReducer,
    EmployeeInfoReducer,
    StudentStatReducer,
    EmployeeStatReducer
});
