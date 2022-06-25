import React, {useEffect,useState}from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import {Button, Divider, Grid, Typography, Paper, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Fab, Switch, FormControl,FormHelperText, InputLabel, Select, MenuItem,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/core/styles";
import {SimpleModal} from '../index';
import {EmployeeInfoActionType} from '../../types';
const employeeInfoAction = require('../../actions/main/EmployeeInfoAction');
const sysConst = require('../../utils/SysConst');
const commonUtil = require('../../utils/CommonUtil');
const customTheme = require('../layout/Theme').customTheme;
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: 30
    },
    pageTitle: customTheme.pageTitle,
    pageDivider: customTheme.pageDivider,
    select: {
       width: '100%'
    },
    selectCondition: {width: '100%'},
    button:{
        margin:'15px',
        float:'right'
    },
     head: {
         fontWeight:'bold',
         background:'#F7F6F9',
         borderTop: '2px solid #D4D4D4'

     }
}));
//员工管理
function EmployeeInfo (props) {
    const {employeeInfoReducer,getEmployeeList,getEmployeeById,addEmployee,updateEmployeeInfo,
        getParamCollegeList,getCollegeList,getCollegeLocateList,removeCollegeList} = props;
    const classes = useStyles();
    const highLevelArray =[{label:"是",value:1},{label:"否",value:0}];

    const [modalOpenFlag, setModalOpenFlag] = React.useState(false);
    const [employee, setEmployee] = useState({});
    const [name, setName] = useState("");
    const [ksh, setKsh] = useState("");
    const [collegeYear, setCollegeYear] = useState()
    const [collegeNameObj, setCollegeNameObj] = useState("");
    const [collegeName, setCollegeName] = useState("");
    const [collegeLocate, setCollegeLocate] = useState("");
    const [majorName, setMajorName] = useState("");
    const [phones, setPhones] = useState("");
    const [idNum, setIdNum] = useState("");
    const [gender, setGender] = useState("1");

    const [paramPhone,setParamPhone] = useState("");
    const [paramName,setParamName] = useState("");
    const [paramGender,setParamGender] = useState("");
    const [paramNation,setParamNation] = useState("");
    const [paramCompanyType,setParamCompanyType] = useState("");
    const [paramCompanyName,setParamCompanyName] = useState("");
    const [paramPosType,setParamPosType] = useState("");
    const [paramPosName,setParamPosName] = useState("");
    const [paramDegree,setParamDegree] = useState("");
    const [paramHighLevel,setParamHightLevel] = useState();
    const [paramCollegeDegree,setParamCollegeDegree] = useState();

    const [paramCollegeLocate, setParamCollegeLocate] = useState("");
    const [paramCollegeName,setParamCollegeName] = useState("");
    const [paramMajorName,setParamMajorName] = useState("");
    const [pageNumber,setPageNumber] = useState(0);
    const [validation,setValidation] = useState({});
    //判断新增还是修改
    const [modalCreateFlag, setModalCreateFlag] = useState(false);
    //详情获取id
    const [id, setId] = useState("");
    //用户状态
    const [status, setStatus] = useState("");
    useEffect(()=>{
        const queryObj = {
           
            start :pageNumber
        };
        props.setQueryObj(queryObj);
    },[paramPhone,paramGender,paramCollegeLocate,paramNation,paramCollegeName,paramMajorName,pageNumber])
    useEffect(()=>{
        if(collegeLocate && collegeLocate.college_locate!=null){
            getCollegeList({collegeLocate:collegeLocate.college_locate})
        }else{
            removeCollegeList();
        }
    },[collegeLocate])
    //验证()
    const validate = ()=>{
        const validateObj ={}
            if (!collegeYear) {
                validateObj.collegeYear ='请选择入学年份';
            } 
            if (!ksh) {
                validateObj.ksh ='请输入考生考号';
            }
            if (!name) {
                validateObj.name ='请输入姓名';
            }
            if (!idNum) {
                validateObj.idNum ='请输入身份证号';
            }
            if (!collegeName) {
                validateObj.collegeName ='请确定学校名称';
            }
            if (!majorName) {
                validateObj.majorName ='请输入专业名称';
            }
            if (!phones) {
                validateObj.phones ='请输入电话';
            }
            
        setValidation(validateObj);
        return Object.keys(validateObj).length
    }
    const addEmployeeFunc= ()=>{
        const errorCount = validate();
        if(errorCount==0){            
            addEmployee({name,collegeYear,gender,ksh,collegeLocate,collegeName,majorName,phones,idNum});
            setModalOpenFlag(false);
        }
    }
    const updateEmployeeInfoById= (id)=>{
        const errorCount = validate();
        if(errorCount===0){
            updateEmployeeInfo({name, collegeYear,ksh,collegeName,majorName,phones,idNum},id)
            
            setModalOpenFlag(false);
        }
    }
    
    //初始添加模态框值
    const handleAddOpen =(employee) =>{
        setModalOpenFlag(true);
        if (employee == null) {
            setModalCreateFlag(true);
            setKsh('');
            setGender('1');
            setCollegeYear();
            setCollegeLocate();
            setCollegeNameObj();
            setCollegeName();
            setMajorName();
            setIdNum();
            setPhones();
        } else {
            setValidation({});
            setModalCreateFlag(false);
            setKsh(employee.ksh);
            setName(employee.name);
            setGender(employee.gender);
            setCollegeYear(employee.college_year);
            setCollegeLocate({college_locate:employee.college_locate});
            setCollegeName(employee.college_name);
            setCollegeNameObj({college_name:employee.college_name})
            setIdNum(employee.id_num);
            setMajorName(employee.major_name);
            setPhones(employee.phones);
            setId(employee.id);
        }
    }
    // 关闭模态
    const modalClose = () => {
        setModalOpenFlag(false);
    };
    const getEmployeeArray =() =>{
        props.setQueryObj({
            phone:paramPhone,
            name :paramName,
            collegeYear :paramNation,
            collegeLocate:paramCollegeLocate&&paramCollegeLocate.college_locate,
            collegeName :paramCollegeName&&paramCollegeName.college_name,
            majorName :paramMajorName,
            gender :paramGender,
            start :0})
        getEmployeeList();
        setPageNumber(0);
    }
    //上一页
    const getPreEmployeeList = () => {
        setPageNumber(pageNumber- (props.employeeInfoReducer.size-1));
        props.setQueryObj({
            phone:paramPhone,
            name :paramName,
            collegeYear :paramNation,
            collegeLocate:paramCollegeLocate&&paramCollegeLocate.college_locate,
            collegeName :paramCollegeName&&paramCollegeName.college_name,
            majorName :paramMajorName,
            gender :paramGender,
            start :pageNumber- (props.employeeInfoReducer.size-1)})
        getEmployeeList();
    };
    //下一页
    const getNextEmployeeList = () => {
        setPageNumber(pageNumber+ (props.employeeInfoReducer.size-1));
        props.setQueryObj({
            phone:paramPhone,
            name :paramName,
            collegeYear :paramNation,
            collegeLocate:paramCollegeLocate&&paramCollegeLocate.college_locate,
            collegeName :paramCollegeName&&paramCollegeName.college_name,
            majorName :paramMajorName,
            gender :paramGender,
            start :pageNumber+ (props.employeeInfoReducer.size-1)})
        getEmployeeList();
    };
    useEffect(()=>{
        getCollegeLocateList();
    },[])
    return (
        <div className={classes.root}>
            {/* 标题部分 */}
            <Typography gutterBottom className={classes.pageTitle}>在职人员管理</Typography>
            <Divider light className={classes.pageDivider}/>

            {/*查询条件*/}
            <Grid container  spacing={1}>
                
                <Grid item xs={1}>
                    <TextField
                        fullWidth={true}
                        margin="dense"
                        variant="outlined"
                        label="电话"
                        value={paramPhone}
                        onChange={(e)=>setParamPhone(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <TextField
                        fullWidth={true}
                        margin="dense"
                        variant="outlined"
                        label="姓名"
                        value={paramName}
                        onChange={(e)=>setParamName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1}>
                    <FormControl variant="outlined" fullWidth margin="dense">
                        <InputLabel >性别</InputLabel>
                        <Select label="性别"
                                value={paramGender}
                                onChange={(event, value) => {
                                    setParamGender(event.target.value);
                                }}
                        >
                            <MenuItem value="">请选择</MenuItem>
                            {sysConst.GENDER.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl variant="outlined" fullWidth margin="dense">
                        <InputLabel >民族</InputLabel>
                        <Select label="民族"
                                value={paramNation}
                                onChange={(event, value) => {
                                    setParamNation(event.target.value);
                                }}
                        >
                            <MenuItem value="">请选择</MenuItem>
                            {commonUtil.getLastYearArray(10).map((item,index) => (
                                <MenuItem key={"college_locate"+index} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl variant="outlined" fullWidth margin="dense">
                        <InputLabel >单位性质</InputLabel>
                        <Select label="单位性质"
                                value={paramCompanyType}
                                onChange={(event, value) => {
                                    setParamCompanyType(event.target.value);
                                }}
                        >
                            <MenuItem value="">请选择</MenuItem>
                            {sysConst.COMPANY_TYPE.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl variant="outlined" fullWidth margin="dense">
                        <InputLabel >职称层级</InputLabel>
                        <Select label="职称层级"
                                value={paramPosType}
                                onChange={(event, value) => {
                                    setParamPosType(event.target.value);
                                }}
                        >
                            <MenuItem value="">请选择</MenuItem>
                            {sysConst.POS_TYPE.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <FormControl variant="outlined" fullWidth margin="dense">
                        <InputLabel >双一流高校</InputLabel>
                        <Select label="双一流高校"
                                value={paramHighLevel}
                                onChange={(event, value) => {
                                    setParamHightLevel(event.target.value);
                                }}
                        >
                            <MenuItem value="">请选择</MenuItem>
                            {highLevelArray.map((item) => (
                                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs>
                   <Autocomplete ListboxProps={{ style: { maxHeight: '175px' } }} fullWidth={true}
                       options={employeeInfoReducer.collegeLocateList}
                       getOptionLabel={(option) => option.college_locate||""}
                       onChange={(e,value)=>{
                            setParamCollegeLocate(value)
                            if(value && value.college_locate!=null){
                                getParamCollegeList({collegeLocate:value.college_locate})
                            }else{
                                removeCollegeList();
                            }
                       }}
                       value={paramCollegeLocate}
                       renderInput={(params) => <TextField {...params} label="学校属地" margin="dense" variant="outlined"
                       />}
                   />
               </Grid>
               <Grid item xs>
                   <Autocomplete ListboxProps={{ style: { maxHeight: '175px' } }} fullWidth={true}
                       options={employeeInfoReducer.paramCollegeList}
                       getOptionLabel={(option) => option.college_name||""}
                       onChange={(e,value)=>{
                           setParamCollegeName(value)
                       }}
                       value={paramCollegeName}
                       renderInput={(params) => <TextField {...params} label="学校" margin="dense" variant="outlined"
                       />}
                   />
               </Grid>
                {/*查询按钮*/}
                <Grid item xs={1} align="center">
                    <Fab size="small" color="primary" aria-label="add" onClick={() => {getEmployeeArray()}} style={{marginTop: 5}}>
                        <i className="mdi mdi-magnify mdi-24px"/>
                    </Fab>
                </Grid>
                {/*添加按钮*/}
                <Grid item xs={1} align="center">
                    <Fab size="small" color="primary" aria-label="add" onClick={()=>{handleAddOpen(null)}} style={{marginTop: 5}}>
                        <i className="mdi mdi-plus mdi-24px" />
                    </Fab>
                </Grid>
            </Grid>
            <Grid>
                
            </Grid>
            {/*主体*/}
            <Grid container spacing={2}>
                <TableContainer component={Paper} style={{marginTop:20}}>
                    <Table  size={'small'} aria-label="a dense table">
                        <TableHead >
                            <TableRow style={{height:50}}>
                                <TableCell className={classes.head} align="center">考号</TableCell>
                                <TableCell className={classes.head} align="center">姓名</TableCell>
                                <TableCell className={classes.head} align="center">生日</TableCell>
                                <TableCell className={classes.head} align="center">性别</TableCell>
                                <TableCell className={classes.head} align="center">入学年份</TableCell>
                                <TableCell className={classes.head} align="center">学校</TableCell>
                                <TableCell className={classes.head} align="center">专业</TableCell>
                                <TableCell className={classes.head} align="center">电话</TableCell>
                                <TableCell className={classes.head} align="center">录入时间</TableCell>
                                <TableCell className={classes.head} align="center">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeInfoReducer.employeeArray.length > 0 && employeeInfoReducer.employeeArray.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center" >{row.ksh}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{commonUtil.number2date(row.birth)}</TableCell>
                                    <TableCell align="center">{commonUtil.getJsonValue(sysConst.GENDER, row.gender)}</TableCell>
                                    <TableCell align="center">{row.college_year}</TableCell>
                                    <TableCell align="center">{row.college_name}</TableCell>
                                    <TableCell align="center">{row.major_name}</TableCell>
                                    <TableCell align="center">{row.phones}</TableCell>
                                    <TableCell align="center">{commonUtil.getDateTime(row.created_on)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" edge="start" size="small" onClick={() => {handleAddOpen(row);}}>
                                            <i className="mdi mdi-table-search"/>
                                        </IconButton>
                                    </TableCell>                                    
                                </TableRow>))}
                            { employeeInfoReducer.employeeArray.length === 0 &&
                                <TableRow style={{height:60}}><TableCell align="center" colSpan="7">暂无数据</TableCell></TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {/* 上下页按钮 */}
            <Box style={{textAlign: 'right', marginTop: 20}}>
                {employeeInfoReducer.dataSize >= employeeInfoReducer.size &&
                <Button className={classes.button} variant="contained" color="primary"  size="small" onClick={getNextEmployeeList}>
                    下一页
                </Button>}
                {employeeInfoReducer.queryObj.start > 0 && employeeInfoReducer.dataSize > 0 &&
                <Button className={classes.button} variant="contained" color="primary"  size="small" onClick={getPreEmployeeList}>
                    上一页
                </Button>}
            </Box>

            {/*添加或修改用户信息*/}
            <SimpleModal
                title={modalCreateFlag==true ? "新增学生信息" : "修改学生信息"}
                open={modalOpenFlag}
                onClose={modalClose}
                showFooter={true}
                footer={
                    <>
                        {modalCreateFlag===false? <Button variant="contained" onClick={()=>{updateEmployeeInfoById(id)}}  color="secondary">
                            保存
                        </Button>:'' }
                        {modalCreateFlag===true?
                            <Button variant="contained" onClick={addEmployeeFunc} color="primary">
                                确定
                            </Button>:''}
                        <Button onClick={modalClose} color="primary" autoFocus>
                            取消
                        </Button>
                    </>
                }
            >
                <Grid  container spacing={3}>
                    
                    <Grid item xs>
                    <FormControl variant="outlined" fullWidth margin="dense" error={validation.collegeYear&&validation.collegeYear!=''}>
                        <InputLabel >入学年份</InputLabel>
                        <Select label="入学年份"
                            value={collegeYear}
                            onChange={(event, value) => {
                                setCollegeYear(event.target.value);
                            }}
                            
                        >
                            <MenuItem value="">请选择</MenuItem>
                            {commonUtil.getLastYearArray(10).map((item,index) => (
                                <MenuItem key={"college_year"+index} value={item}>{item}</MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{validation.collegeYear}</FormHelperText>
                    </FormControl>
                    </Grid>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            label="考号"
                            name="sku"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setKsh(e.target.value)
                            }}
                            error={validation.ksh&&validation.ksh!=''}
                            helperText={validation.ksh}
                            value={ksh}
                        />
                    </Grid>
                </Grid>
                <Grid  container spacing={3}>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            label="姓名"
                            name="name"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setName(e.target.value)
                            }}
                            error={validation.name&&validation.name!=''}
                            helperText={validation.name}
                            value={name}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            label="身份证号"
                            name="idNum"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setIdNum(e.target.value)
                            }}
                            error={validation.idNum&&validation.idNum!=''}
                            helperText={validation.idNum}
                            value={idNum}
                        />
                    </Grid>
                </Grid>
                <Grid  container spacing={3}>
                    <Grid item xs>
                        <Autocomplete ListboxProps={{ style: { maxHeight: '175px' } }} fullWidth={true}
                            options={employeeInfoReducer.collegeLocateList}
                            getOptionLabel={(option) => option.college_locate||""}
                            onChange={(e,value)=>{setCollegeLocate(value)}}
                            value={collegeLocate}
                            renderInput={(params) => <TextField {...params} label="学校属地" margin="dense" variant="outlined"
                            />}
                        />
                    </Grid>
                    <Grid item xs>
                        <Autocomplete ListboxProps={{ style: { maxHeight: '175px' } }} fullWidth={true}
                            options={employeeInfoReducer.collegeList}
                            getOptionLabel={(option) => option.college_name||""}
                            onChange={(e,value)=>{
                                setCollegeNameObj(value)
                                if(value && value.college_name){
                                    setCollegeName(value.college_name)
                                }
                            }}
                            value={collegeNameObj}
                            renderInput={(params) => <TextField {...params} label="学校" margin="dense" variant="outlined"
                            error={validation.collegeName&&validation.collegeName!=''}
                            helperText={validation.collegeName}
                            />}
                        />
                        
                    </Grid>
                </Grid>
                <Grid  container spacing={3}>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            label="专业"
                            name="majorName"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setMajorName(e.target.value)
                            }}
                            error={validation.majorName&&validation.majorName!=''}
                            helperText={validation.majorName}
                            value={majorName}
                        />
                    </Grid>
                </Grid>
                <Grid  container spacing={3}>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            label="电话"
                            name="phones"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setPhones(e.target.value)
                            }}
                            error={validation.phones&&validation.phones!=''}
                            helperText={validation.phones}
                            value={phones}
                        />
                    </Grid>
                </Grid>
            </SimpleModal>
        </div>
    )

}
const mapStateToProps = (state, ownProps) => {
    return {
        employeeInfoReducer: state.EmployeeInfoReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    setQueryObj:(queryObj) =>{
        dispatch(EmployeeInfoActionType.setQueryObj(queryObj))
    },
    
    //添加学生
    addEmployee: (paramObj) => {     
        console.log(paramObj)   
        dispatch(employeeInfoAction.addEmployee(paramObj));
    },
    //获取列表
    getEmployeeList: () => {
        dispatch(employeeInfoAction.getEmployeeList())

    },
    //获取学校属地列表
    getCollegeLocateList: () => {
        dispatch(employeeInfoAction.getCollegeLocateList())

    },
    //获取学校列表
    getCollegeList: (paramObj) => {
        dispatch(employeeInfoAction.getCollegeList(paramObj))

    },
    //获取查询学校列表
    getParamCollegeList: (paramObj) => {
        console.log("get param college")
        dispatch(employeeInfoAction.getParamCollegeList(paramObj))

    },
    //清空学校列表
    removeCollegeList:() => {
        dispatch(EmployeeInfoActionType.getCollegeList([]))
    },
    //获取学生信息(获取初始值)
    getemployeeById:(id) => {
        dispatch(employeeInfoAction.getEmployeeById(id))
    },
    //修改学生信息
    updateEmployeeInfo: (paramObj,id) => {
        
        dispatch(employeeInfoAction.updateEmployeeInfo(paramObj,id))
    },
    
});
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInfo)


