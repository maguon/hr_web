import {
    Login,
    Register,
    ResetPassword,
    UpLoadFile,
    AdminUserSetting,
    AppSetting,
    AuthoritySetting,
    UserPerfLevel,
    StudentInfo,
    StudentStat,
    EmployeeInfo,
    EmployeeStat,
    MainPanel
} from "../components";

export const routes = [
    // 登录画面
    {path: "/login", exact: true, component: Login},
    {path: "/register", exact: true, component: Register},
    {path: "/reset", exact: true, component: ResetPassword}
];

export const routesWithHeader = [
    
    {path: "/student_info", exact: true, component: StudentInfo},
    {path: "/employee_info", exact: true, component: EmployeeInfo},
    {path: "/student_stat", exact: true, component: StudentStat},
    {path: "/employee_stat", exact: true, component: EmployeeStat},

    /** 系统设置 */
    //员工管理
    {path: "/admin_user_setting", exact: true, component: AdminUserSetting},
    {path: "/main_panel", exact: true, component: MainPanel},
    // App系统
    {path: "/app_setting", exact: true, component: AppSetting},
    // 绩效设置
    {path: "/user_perf_level", exact: true, component: UserPerfLevel},
    // 权限设置
    {path: "/authority_setting", exact: true, component: AuthoritySetting},
    {path: "/upload", exact: true, component: UpLoadFile},
];