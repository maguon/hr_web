import React, {useEffect,useState}from 'react';
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import {Button, Divider, Grid, Typography, Paper, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Box, Fab, Switch, FormControl, InputLabel, Select, MenuItem,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/core/styles";
import {SimpleModal} from '../index';
import {StudentInfoActionType} from '../../types';
const studentInfoAction = require('../../actions/main/StudentInfoAction');
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
function StudentInfo (props) {
    const {studentInfoReducer,getStudentList,getStudentById,addStudent,updateStudentInfo,
        getParamCollegeList,getCollegeList,getCollegeLocateList,removeCollegeList} = props;
    const classes = useStyles();
    const highLevelArray =[{label:"是",value:1},{label:"否",value:0}];

    const [modalOpenFlag, setModalOpenFlag] = React.useState(false);
    const [student, setStudent] = useState({});
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

    const [paramKsh,setParamKsh] = useState("");
    const [paramName,setParamName] = useState("");
    const [paramGender,setParamGender] = useState("");
    const [paramCollegeYear,setParamCollegeYear] = useState("");
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
    },[paramKsh,paramGender,paramCollegeLocate,paramCollegeYear,paramCollegeName,paramMajorName,pageNumber])
   
    //验证()
    const validate = ()=>{
        const validateObj ={}
            /* if (!adminUserPhone) {
                validateObj.adminUserPhone ='请输入手机号';
            } else if (adminUserPhone.length != 11&&modalCreateFlag==true) {
                validateObj.adminUserPhone ='请输入11位手机号';
            }
            if (!type||type.type_name==null) {
                validateObj.type ='请输入用户集群';
            }
            if (!adminUsername) {
                validateObj.adminUsername ='请输入用户姓名';
            }
            if (!password&&modalCreateFlag==true) {
                validateObj.password ='请输入密码';
            }else if (password.length <6&&modalCreateFlag==true) {
                validateObj.password ='请输入大于6位的密码';
            } */
        setValidation(validateObj);
        return Object.keys(validateObj).length
    }
    const addStudentFunc= ()=>{
        const errorCount = validate();
        if(errorCount==0){            
            addStudent({name,collegeYear,gender,ksh,collegeLocate,collegeName,majorName,phones,idNum});
            setModalOpenFlag(false);
        }
    }
    const updateStudentInfoById= (id)=>{
        const errorCount = validate();
        if(errorCount==0){
            updateStudentInfo(name, collegeYear,gender,ksh,collegeName,majorName,phones,idNum,id)
            
            setModalOpenFlag(false);
        }
    }
    
    //初始添加模态框值
    const handleAddOpen =(student) =>{
        setModalOpenFlag(true);
        if (student == null) {
            setModalCreateFlag(true);
            setKsh('');
            setGender('1');
            setCollegeYear();
            setCollegeName();
            setMajorName();
            setIdNum();
            setPhones();
        } else {
            setValidation({});
            setModalCreateFlag(false);
            setName(student.name);
            setGender(student.gender);
            setCollegeYear(student.collegeYear);
            setId(student.id);
        }
    }
    // 关闭模态
    const modalClose = () => {
        setModalOpenFlag(false);
    };
    const getStudentArray =() =>{
        props.setQueryObj({
            ksh:paramKsh,
            name :paramName,
            collegeYear :paramCollegeYear,
            collegeLocate:paramCollegeLocate&&paramCollegeLocate.college_locate,
            collegeName :paramCollegeName&&paramCollegeName.college_name,
            majorName :paramMajorName,
            gender :paramGender,
            start :0})
        getStudentList();
        setPageNumber(0);
    }
    //上一页
    const getPreStudentList = () => {
        setPageNumber(pageNumber- (props.studentInfoReducer.size-1));
        props.setQueryObj({
            ksh:paramKsh,
            name :paramName,
            collegeYear :paramCollegeYear,
            collegeLocate:paramCollegeLocate&&paramCollegeLocate.college_locate,
            collegeName :paramCollegeName&&paramCollegeName.college_name,
            majorName :paramMajorName,
            gender :paramGender,
            start :pageNumber- (props.studentInfoReducer.size-1)})
        getStudentList();
    };
    //下一页
    const getNextStudentList = () => {
        setPageNumber(pageNumber+ (props.studentInfoReducer.size-1));
        props.setQueryObj({
            ksh:paramKsh,
            name :paramName,
            collegeYear :paramCollegeYear,
            collegeLocate:paramCollegeLocate&&paramCollegeLocate.college_locate,
            collegeName :paramCollegeName&&paramCollegeName.college_name,
            majorName :paramMajorName,
            gender :paramGender,
            start :pageNumber+ (props.studentInfoReducer.size-1)})
        getStudentList();
    };
    useEffect(()=>{
        getCollegeLocateList();
    },[])
    return (
        <div className={classes.root}>
            {/* 标题部分 */}
            <Typography gutterBottom className={classes.pageTitle}>考生管理</Typography>
            <Divider light className={classes.pageDivider}/>

            {/*查询条件*/}
            <Grid container  spacing={1}>
                
                <Grid item xs={1}>
                    <TextField
                        fullWidth={true}
                        margin="dense"
                        variant="outlined"
                        label="考号"
                        value={paramKsh}
                        onChange={(e)=>setParamKsh(e.target.value)}
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
                        <InputLabel >入学年份</InputLabel>
                        <Select label="入学年份"
                                value={paramCollegeYear}
                                onChange={(event, value) => {
                                    setParamCollegeYear(event.target.value);
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
                       options={studentInfoReducer.collegeLocateList}
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
                       options={studentInfoReducer.paramCollegeList}
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
                    <Fab size="small" color="primary" aria-label="add" onClick={() => {getStudentArray()}} style={{marginTop: 5}}>
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
                                <TableCell className={classes.head} align="center">考生号</TableCell>
                                <TableCell className={classes.head} align="center">姓名</TableCell>
                                <TableCell className={classes.head} align="center">生日</TableCell>
                                <TableCell className={classes.head} align="center">性别</TableCell>
                                <TableCell className={classes.head} align="center">入学年份</TableCell>
                                <TableCell className={classes.head} align="center">学校</TableCell>
                                <TableCell className={classes.head} align="center">专业</TableCell>
                                <TableCell className={classes.head} align="center">电话</TableCell>
                                <TableCell className={classes.head} align="center">录入时间</TableCell>
                                {/* <TableCell className={classes.head} align="center">操作</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {studentInfoReducer.studentArray.length > 0 && studentInfoReducer.studentArray.map((row) => (
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
                                    
                                </TableRow>))}
                            { studentInfoReducer.studentArray.length === 0 &&
                                <TableRow style={{height:60}}><TableCell align="center" colSpan="7">暂无数据</TableCell></TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            {/* 上下页按钮 */}
            <Box style={{textAlign: 'right', marginTop: 20}}>
                {studentInfoReducer.dataSize >= studentInfoReducer.size &&
                <Button className={classes.button} variant="contained" color="primary"  size="small" onClick={getNextStudentList}>
                    下一页
                </Button>}
                {studentInfoReducer.queryObj.start > 0 && studentInfoReducer.dataSize > 0 &&
                <Button className={classes.button} variant="contained" color="primary"  size="small" onClick={getPreStudentList}>
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
                        {status!=0&&modalCreateFlag==false? <Button variant="contained" onClick={setStudent}  color="primary">
                            确定
                        </Button>:'' }


                        {modalCreateFlag==true?
                            <Button variant="contained" onClick={addStudentFunc} color="primary">
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
                    <FormControl variant="outlined" fullWidth margin="dense">
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
                            options={studentInfoReducer.collegeLocateList}
                            getOptionLabel={(option) => option.college_locate||""}
                            onChange={(e,value)=>{
                                    setCollegeLocate(value)
                                    if(value && value.college_locate!=null){
                                        getCollegeList({collegeLocate:value.college_locate})
                                    }else{
                                        removeCollegeList();
                                    }
                            }}
                            value={collegeLocate}
                            renderInput={(params) => <TextField {...params} label="学校属地" margin="dense" variant="outlined"
                            />}
                        />
                    </Grid>
                    <Grid item xs>
                        <Autocomplete ListboxProps={{ style: { maxHeight: '175px' } }} fullWidth={true}
                            options={studentInfoReducer.collegeList}
                            getOptionLabel={(option) => option.college_name||""}
                            onChange={(e,value)=>{
                                setCollegeNameObj(value)
                                if(value && value.college_name){
                                    setCollegeName(value.college_name)
                                }
                            }}
                            value={collegeNameObj}
                            renderInput={(params) => <TextField {...params} label="学校" margin="dense" variant="outlined"
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
        studentInfoReducer: state.StudentInfoReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    setQueryObj:(queryObj) =>{
        dispatch(StudentInfoActionType.setQueryObj(queryObj))
    },
    
    //添加学生
    addStudent: (paramObj) => {     
        console.log(paramObj)   
        dispatch(studentInfoAction.addStudent(paramObj));
    },
    //获取列表
    getStudentList: () => {
        dispatch(studentInfoAction.getStudentList())

    },
    //获取学校属地列表
    getCollegeLocateList: () => {
        dispatch(studentInfoAction.getCollegeLocateList())

    },
    //获取学校列表
    getCollegeList: (paramObj) => {
        dispatch(studentInfoAction.getCollegeList(paramObj))

    },
    //获取查询学校列表
    getParamCollegeList: (paramObj) => {
        console.log("get param college")
        dispatch(studentInfoAction.getParamCollegeList(paramObj))

    },
    //清空学校列表
    removeCollegeList:() => {
        dispatch(StudentInfoActionType.getCollegeList([]))
    },
    //获取学生信息(获取初始值)
    getStudentById:(id) => {
        dispatch(studentInfoAction.getStudentById(id))
    },
    //修改学生信息
    updateStudentInfo: (realName, gender,type,perfLevelId,id) => {
        if (realName.length > 0) {
            dispatch(studentInfoAction.updateStudentInfo({realName, gender,type,perfLevelId},id))
        }
    },
    
});
export default connect(mapStateToProps, mapDispatchToProps)(StudentInfo)


