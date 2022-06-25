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
});
