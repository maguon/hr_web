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
        getParamCollegeList,getCollegeList,getCollegeLocateList,removeCollegeList,getNationList,getCompanyNameList,getPosNameList} = props;
    const classes = useStyles();
    const highLevelArray =[{label:"是",value:1},{label:"否",value:0}];

    const [modalOpenFlag, setModalOpenFlag] = React.useState(false);
    const [employee, setEmployee] = useState({});
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [nation, setNation] = useState("汉族");
    const [gradYear, setGradYear] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [posType, setPosType] = useState("");
    const [posName, setPosName] = useState("");
    const [remark, setRemark] = useState("");
    const [collegeYear, setCollegeYear] = useState()
    const [collegeNameObj, setCollegeNameObj] = useState("");
    const [collegeName, setCollegeName] = useState("");
    const [collegeLocate, setCollegeLocate] = useState("");
    const [majorName, setMajorName] = useState("");
    const [degree, setDegree] = useState("");
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
            
            if (!phone) {
                validateObj.phone ='请输入电话';
            }
            if (!name) {
                validateObj.name ='请输入姓名';
            }
            if (!idNum) {
                validateObj.idNum ='请输入身份证号';
            }
            if (!gradYear) {
                validateObj.gradYear ='请输入毕业年份';
            }
            if (!collegeName) {
                validateObj.collegeName ='请确定学校名称';
            }
            if (!degree) {
                validateObj.degree ='请输入学位信息';
            }
            if (!majorName) {
                validateObj.majorName ='请输入专业名称';
            }
            if (!nation) {
                validateObj.majorName ='请输入民族';
            }
            if (!posType) {
                validateObj.posType ='请选择职称层级';
            }
            if (!posName) {
                validateObj.posName ='请输入职称';
            }
            if (!companyType) {
                validateObj.companyType ='请选择单位性质';
            }
            if (!companyName) {
                validateObj.companyName ='请输入单位名称';
            }
            
        setValidation(validateObj);
        return Object.keys(validateObj).length
    }
    const addEmployeeFunc= ()=>{
        const errorCount = validate();
        console.log(errorCount)
        if(errorCount==0){            
            addEmployee({name,gradYear,phone,idNum,nation,collegeLocate,collegeName,majorName,degree,companyType,companyName,posType,posName,remark});
            setModalOpenFlag(false);
        }
    }
    const updateEmployeeInfoById= (id)=>{
        const errorCount = validate();
        if(errorCount===0){
            updateEmployeeInfo({name,gradYear,phone,idNum,nation,collegeLocate,collegeName,majorName,degree,companyType,companyName,posType,posName,remark},id)
            
            setModalOpenFlag(false);
        }
    }
    
    //初始添加模态框值
    const handleAddOpen =(employee) =>{
        setModalOpenFlag(true);
        if (employee == null) {
            setModalCreateFlag(true);
            setPhone('');
            setName('');
            setNation('汉族');
            setIdNum('');
            setGradYear();
            setCompanyType();
            setCompanyName();
            setPosType();
            setPosName();
            setCollegeLocate();
            setCollegeNameObj();
            setCollegeName('');
            setDegree('');
            setMajorName('');
            setRemark('');
        } else {
            setValidation({});
            setModalCreateFlag(false);
            setPhone(employee.phone);
            setName(employee.name);
            setIdNum(employee.id_num);
            setGradYear(employee.grad_year);
            setCompanyType(employee.company_type);
            setCompanyName(employee.company_name);
            setPosType(employee.pos_type);
            setPosName(employee.pos_name)
            setCollegeLocate({college_locate:employee.college_locate});
            setCollegeName(employee.college_name);
            setCollegeNameObj({college_name:employee.college_name})
            setDegree(employee.degree)
            setMajorName(employee.major_name);
            setRemark(employee.remark)
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
        getNationList();
        getCompanyNameList();
        getPosNameList();
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
                   <Autocomplete ListboxProps={{ style: { maxHeight: '175px' } }} fullWidth={true}
                       options={employeeInfoReducer.nationList}
                       getOptionLabel={(option) => option.nation||""}
                       onChange={(e,value)=>{
                            setParamNation(value)
                            
                       }}
                       value={paramNation}
                       renderInput={(params) => <TextField {...params} label="民族" margin="dense" variant="outlined"
                       />}
                   />
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
                <Grid item xs>
                   <Autocomplete ListboxProps={{ style: { maxHeight: '175px' } }} fullWidth={true}
                       options={employeeInfoReducer.companyNameList}
                       getOptionLabel={(option) => option.company_name||""}
                       onChange={(e,value)=>{
                            setParamCompanyName(value)
                            
                       }}
                       value={paramCompanyName}
                       renderInput={(params) => <TextField {...params} label="单位名称" margin="dense" variant="outlined"
                       />}
                   />
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
                <Grid item xs>
                   <Autocomplete ListboxProps={{ style: { maxHeight: '175px' } }} fullWidth={true}
                       options={employeeInfoReducer.posNameList}
                       getOptionLabel={(option) => option.pos_name||""}
                       onChange={(e,value)=>{
                            setParamPosName(value)
                            
                       }}
                       value={paramPosName}
                       renderInput={(params) => <TextField {...params} label="职称" margin="dense" variant="outlined"
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
                                <TableCell className={classes.head} align="center">电话</TableCell>
                                <TableCell className={classes.head} align="center">姓名</TableCell>
                                <TableCell className={classes.head} align="center">生日</TableCell>
                                <TableCell className={classes.head} align="center">性别</TableCell>
                                <TableCell className={classes.head} align="center">民族</TableCell>
                                <TableCell className={classes.head} align="center">毕业年份</TableCell>
                                <TableCell className={classes.head} align="center">学校</TableCell>
                                <TableCell className={classes.head} align="center">专业</TableCell>
                                <TableCell className={classes.head} align="center">单位性质</TableCell>
                                <TableCell className={classes.head} align="center">单位名称</TableCell>
                                <TableCell className={classes.head} align="center">职称层级</TableCell>
                                <TableCell className={classes.head} align="center">职称</TableCell>
                                <TableCell className={classes.head} align="center">录入时间</TableCell>
                                <TableCell className={classes.head} align="center">操作</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employeeInfoReducer.employeeArray.length > 0 && employeeInfoReducer.employeeArray.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell align="center" >{row.phone}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{commonUtil.number2date(row.birth)}</TableCell>
                                    <TableCell align="center">{commonUtil.getJsonValue(sysConst.GENDER, row.gender)}</TableCell>
                                    <TableCell align="center">{row.nation}</TableCell>
                                    <TableCell align="center">{row.grad_year}</TableCell>
                                    <TableCell align="center">{row.college_name}</TableCell>
                                    <TableCell align="center">{row.major_name}</TableCell>
                                    <TableCell align="center">{commonUtil.getJsonValue(sysConst.COMPANY_TYPE, row.company_type)}</TableCell>
                                    <TableCell align="center">{row.company_name}</TableCell>
                                    <TableCell align="center">{commonUtil.getJsonValue(sysConst.POS_TYPE, row.pos_type)}</TableCell>
                                    <TableCell align="center">{row.pos_name}</TableCell>
                                    <TableCell align="center">{commonUtil.getDateTime(row.created_on)}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="primary" edge="start" size="small" onClick={() => {handleAddOpen(row);}}>
                                            <i className="mdi mdi-table-search"/>
                                        </IconButton>
                                    </TableCell>                                    
                                </TableRow>))}
                            { employeeInfoReducer.employeeArray.length === 0 &&
                                <TableRow style={{height:60}}><TableCell align="center" colSpan="14">暂无数据</TableCell></TableRow>
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
                title={modalCreateFlag==true ? "新增在职人员信息" : "修改在职信息"}
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
                        <TextField fullWidth
                            margin='dense'
                            label="电话"
                            name="phone"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setPhone(e.target.value)
                            }}
                            error={validation.phone&&validation.phone!=''}
                            helperText={validation.phone}
                            value={phone}
                        />
                    </Grid>
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
                </Grid>
                <Grid  container spacing={3}>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            label="民族"
                            name="nation"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setNation(e.target.value)
                            }}
                            error={validation.nation&&validation.nation!=''}
                            helperText={validation.nation}
                            value={nation}
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
                            label="毕业年份"
                            name="gradYear"
                            type="number"
                            variant="outlined"
                            onChange={(e)=>{
                                setGradYear(e.target.value)
                            }}
                            error={validation.gradYear&&validation.gradYear!=''}
                            helperText={validation.gradYear}
                            value={gradYear}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            label="学位"
                            name="degree"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setDegree(e.target.value)
                            }}
                            error={validation.degree&&validation.degree!=''}
                            helperText={validation.degree}
                            value={degree}
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
                        <FormControl variant="outlined" fullWidth margin="dense" error={validation.companyType&&validation.companyType!=''}>
                            <InputLabel >单位性质</InputLabel>
                            <Select label="单位性质"
                                    value={companyType}
                                    onChange={(event, value) => {
                                        setCompanyType(event.target.value);
                                    }}
                            >
                                <MenuItem value="">请选择</MenuItem>
                                {sysConst.COMPANY_TYPE.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{validation.companyType}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            label="单位名称"
                            name="companyName"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setCompanyName(e.target.value)
                            }}
                            error={validation.companyName&&validation.companyName!=''}
                            helperText={validation.companyName}
                            value={companyName}
                        />
                    </Grid>
                </Grid>
                <Grid  container spacing={3}>
                    <Grid item xs>
                        <FormControl variant="outlined" fullWidth margin="dense" error={validation.posType&&validation.posType!=''}>
                            <InputLabel >职称层级</InputLabel>
                            <Select label="职称层级"
                                    value={posType}
                                    onChange={(event, value) => {
                                        setPosType(event.target.value);
                                    }}
                            >
                                <MenuItem value="">请选择</MenuItem>
                                {sysConst.POS_TYPE.map((item) => (
                                    <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{validation.posType}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            label="职称"
                            name="posName"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setPosName(e.target.value)
                            }}
                            error={validation.posName&&validation.posName!=''}
                            helperText={validation.posName}
                            value={posName}
                        />
                    </Grid>
                </Grid>
                <Grid  container spacing={3}>
                    <Grid item xs>
                        <TextField fullWidth
                            margin='dense'
                            label="备注"
                            name="remark"
                            type="text"
                            variant="outlined"
                            onChange={(e)=>{
                                setRemark(e.target.value)
                            }}
                            error={validation.remark&&validation.remark!=''}
                            helperText={validation.remark}
                            value={remark}
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
    //获取民族列表
    getNationList: () => {
        dispatch(employeeInfoAction.getNationList())

    },
    //获取单位列表
    getCompanyNameList: () => {
        dispatch(employeeInfoAction.getCompanyNameList())

    },
    //获取职位列表
    getPosNameList: () => {
        dispatch(employeeInfoAction.getPosNameList())

    },
    //获取学校列表
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


