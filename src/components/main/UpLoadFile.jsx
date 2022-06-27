import React, {useState,useRef}from 'react';
import {connect} from 'react-redux';
import { CSVReader } from 'react-papaparse';
import Swal from 'sweetalert2';
import {
    Button, Divider, Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, AppBar, Tabs, Tab
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TabPanel from "@material-ui/lab/TabPanel";
import TabContext from "@material-ui/lab/TabContext";
const UpLoadFileAction = require('../../actions/main/UpLoadFileAction');
const commonUtil = require('../../utils/CommonUtil');
const customTheme = require('../layout/Theme').customTheme;
const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: 30
    },
    pageTitle: customTheme.pageTitle,
    pageDivider: customTheme.pageDivider,
    select: {
        width: '100%',
        marginTop:'16px'
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
function UpLoadFile (props) {
    const {uploadFileReducer,studentFileUpload,employeeFileUpload} = props;
    const classes = useStyles();
    const [value, setValue] = React.useState('1');
    const [successData,setSuccessData]=useState(false);
    const [dataBox,setDataBox]=useState(false);
    const [localSuccess,setLocalSuccess]=useState(true);
    const [headerArray,setHeaderArray]=useState([]);
    const [dataLength,setDataLength]=useState(0);
    const [errorNumber,setErrorNumber]=useState('0');
    const [tContent,setTContent]=useState([]);
    const [inputFile,setInputFile] =useState(null);
    const [successDataEmployee,setSuccessDataEmployee]=useState(false);
    const [dataBoxEmployee,setDataBoxEmployee]=useState(false);
    const [localSuccessEmployee,setLocalSuccessEmployee]=useState(true);
    const [headerArrayEmployee,setHeaderArrayEmployee]=useState([]);
    const [dataLengthEmployee,setDataLengthEmployee]=useState(0);
    const [errorNumberEmployee,setErrorNumberEmployee]=useState('0');
    const [tContentEmployee,setTContentEmployee]=useState([]);
    const [inputFileEmployee,setInputFileEmployee] =useState(null);
    const buttonRef = useRef();
    const fileStudentParams = [
        {name: '考号', type: 'string', require: true},
        {name: '入学年份', type: 'number',require: true},
        {name: '姓名', type: 'string',require: true},
        {name: '身份证号', type: 'string',require: true},
        {name: '学校', type: 'string',require: true},
        {name: '专业', type: 'string',require: true},
        {name: '电话', type: 'string',require: true},
    ];
    const fileEmployeeParams = [
        {name: '姓名', type: 'string', require: true},
        {name: '身份证号', type: 'string',require: true},
        {name: '电话', type: 'number',require: true},
        {name: '民族', type: 'string',require: true},
        {name: '毕业年份', type: 'number',require: true},
        {name: '学校', type: 'string',require: true},
        {name: '专业', type: 'string',require: true},
        {name: '学位', type: 'string',require: true},
        {name: '单位', type: 'string',require: true},
        {name: '单位性质', type: 'string',require: true},
        {name: '职称', type: 'string',require: true},
        {name: '职称层级', type: 'string',require: true},
        {name: '备注', type: 'string',require: true},
    ];
    const handleOpenDialog = (e) => {
        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }
    const handleOnStudentFileLoad = (file,fileName)=>{
        let ext = fileName&&fileName.name.slice(fileName.name.lastIndexOf(".")+1).toLowerCase();
        if ("csv" != ext) { Swal.fire("文件类型错误");
        } else {
            //表头验证
            setHeaderArray(file[0].data);
            if(commonUtil.titleFilter(file[0].data,fileStudentParams) != false){
                // 主体内容校验
                let content_filter_array = file.slice(1, file.length);
                let con_line = [];
                // excel换行过滤
                for (let i = 0; i < content_filter_array.length; i++) {
                    if (content_filter_array[i].data.length == 1 && content_filter_array[i].data[0] == "") {
                        break;
                    } else {
                        con_line.push(content_filter_array[i]);
                    }
                }
                let resultStudent=commonUtil.ContentFilter(con_line,fileStudentParams);
                setErrorNumber(resultStudent.tableContentErrorFilter.length);
                setTContent(resultStudent.tableContentErrorFilter);
                if (resultStudent.tableContentErrorFilter.length == 0) {
                    setSuccessData(true);
                    setDataBox(false);
                    Swal.fire("数据格式正确"+ resultStudent.tableContentFilter.length+"条" );
                    // 总条数
                    setDataLength(resultStudent.tableContentFilter.length);
                    setLocalSuccess(true);
                } else {
                    setSuccessData(false);
                    setDataBox(true);
                    Swal.fire("错误条数" + resultStudent.tableContentErrorFilter.length);
                }
            }else {
                Swal.fire("表头格式错误", "", "error");
            }
        }
    }
    const handleOnEmployeeFileLoad =(file,fileName)=>{
        let ext = fileName&&fileName.name.slice(fileName.name.lastIndexOf(".")+1).toLowerCase();
        if ("csv" != ext) { Swal.fire("文件类型错误");
        } else {
            //表头验证
            setHeaderArrayEmployee(file[0].data);
            if(commonUtil.titleFilter(file[0].data,fileEmployeeParams) != false){
                // 主体内容校验
                let content_filter_array = file.slice(1, file.length);
                let con_line = [];
                // excel换行过滤
                for (let i = 0; i < content_filter_array.length; i++) {
                    if (content_filter_array[i].data.length == 1 && content_filter_array[i].data[0] == "") {
                        break;
                    } else {
                        con_line.push(content_filter_array[i]);
                    }
                }
                let resultEmployee=commonUtil.ContentFilter(con_line,fileEmployeeParams);
                setErrorNumberEmployee(resultEmployee.tableContentErrorFilter.length);
                setTContentEmployee(resultEmployee.tableContentErrorFilter);
                if (resultEmployee.tableContentErrorFilter.length == 0) {
                    setSuccessDataEmployee(true);
                    setDataBoxEmployee(false);
                    Swal.fire("数据格式正确"+ resultEmployee.tableContentFilter.length+"条" );
                    // 总条数
                    setDataLengthEmployee(resultEmployee.tableContentFilter.length);
                    setLocalSuccessEmployee(true);
                } else {
                    setSuccessDataEmployee(false);
                    setDataBoxEmployee(true);
                    Swal.fire("错误条数" + resultEmployee.tableContentErrorFilter.length);
                }
            }else {
                Swal.fire("表头格式错误", "", "error");
            }
        }
    }
    const uploadStudentCsv =()=>{
        studentFileUpload(inputFile);
    }
    const uploadEmployeeCsv =()=>{
        employeeFileUpload(inputFileEmployee);
    }
    const downLoadStudentCsv =()=>{
        window.open('/考生信息导入模板.csv')
    }
    const downLoadEmployeeCsv =()=>{
        window.open('/在职人员信息导入模板.csv')
    }
    const changeTab = (event, newValue) => {
        setValue(newValue);
    };
    return(
        <div>
            <TabContext value={value}>
                <AppBar position="static" color="default">
                    <Tabs value={value}
                          onChange={changeTab}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="fullWidth">
                        <Tab label="导入说明" value="1" />
                        <Tab label="考生信息导入" value="2" />
                        <Tab label="在职信息导入"   value="3" />
                    </Tabs>
                </AppBar>
                <TabPanel value='1'>
                    <Grid container xs={12} spacing={3} style={{marginTop:'50px'}}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6} style={{color:'#F44336',fontSize:'20px'}}>
                            <Grid item xs={12} align='center' style={{paddingBottom:'20px',borderBottom: '1px solid #ccc' ,fontSize:'30px',color:'#3f51b5'}} >数据导入须知</Grid>
                            <Grid item xs={12} style={{marginTop:'30px',marginLeft:'30px'}}>
                                <i className="mdi  mdi-checkbox-multiple-blank-circle" style={{color:'#3f51b5'}}></i>
                                上传得数据表格必须为csv格式的文件,不支持excel格式的表格文件上传;
                            </Grid>
                            <Grid item xs={12} style={{marginTop:'30px',marginLeft:'30px'}}>
                                <i className="mdi  mdi-checkbox-multiple-blank-circle" style={{color:'#3f51b5'}}></i>
                                上传得数据表格,必须遵守模板的数据表头顺序，若顺序错误将无法上传;
                            </Grid>
                            <Grid item xs={12} style={{marginTop:'30px',marginLeft:'30px'}}>
                                <i className="mdi  mdi-checkbox-multiple-blank-circle" style={{color:'#3f51b5'}}></i>
                                导入的数据各字段分为必填项(不得为空)和选填项(可为空);
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value='2'>
                    {/*品牌上传文件*/}
                    <div className='brand'>
                        {/*按钮*/}
                        <Grid container xs={12} spacing={3}>
                            <Grid item xs={6} align='left'>
                                <Button variant="contained"  color="default" startIcon={<i className="mdi  mdi-download"></i>} onClick={() => {downLoadStudentCsv()}}>
                                    考生导入模板
                                </Button>
                            </Grid>
                            <Grid item xs={6} align='right'>
                                <CSVReader
                                    ref={buttonRef}
                                    noClick
                                    noDrag
                                    noProgressBar
                                    onFileLoad={handleOnStudentFileLoad}
                                >
                                    {( {file} ) => {
                                        setInputFile(file);
                                        return (
                                            <aside>
                                                <Button variant="contained"  color="primary" onClick={handleOpenDialog}>
                                                    批量考生数据导入
                                                </Button>
                                            </aside>
                                        )}}
                                </CSVReader>
                            </Grid>
                        </Grid>
                        {/*本地校验*/}
                        {dataBox&&<div>
                            <p  xs={12} align='center' style={{padding: "20px",background:'#f50057',color:'white',fontSize:'18px'}}>错误数据<span>{errorNumber}</span>条，请修改后重新上传</p>
                            <TableContainer component={Paper}>
                                <Table  size={'small'} aria-label="a dense table">
                                    <TableHead >
                                        <TableRow style={{height:50}}>
                                            <TableCell className={classes.head} align="center">序号</TableCell>
                                            {headerArray.map((row,index)=>(
                                                <TableCell key={'head-'+index} className={classes.head} align="center">{row}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tContent.map((item,index)=>(
                                            <TableRow key={'csv-'+index}>
                                                <TableCell align="center" >{index+1}</TableCell>
                                                {item.data.map((row)=>(
                                                    <TableCell key={index} align="center" >{row}</TableCell>
                                                ))}
                                            </TableRow>

                                        ))}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>}
                        {/*上传校验*/}
                        {successData&&<div>
                            <Divider style={{marginTop: 20}}/>
                            <p><span>{uploadFileReducer.array.successedInsert}</span>/<span>{dataLength}</span></p>

                            {localSuccess&&<p align='center'>
                                <i className="mdi mdi-check "></i><span>本地校验成功</span>
                            </p>}
                            {uploadFileReducer.uploadFlag&&<p align='center'>
                                <i className="mdi mdi-check"></i><span>上传完成</span>
                            </p>}
                            {uploadFileReducer.uploadFlag&&<p align='center'>
                                <span>错误条数:<span>{uploadFileReducer.array.failedCase}</span></span>
                                <span>正确条数:<span>{uploadFileReducer.array.successedInsert}</span></span>
                                <span>总条数:<span>{dataLength}</span></span>
                            </p>}
                            <p align='center'>
                                {localSuccess&& <Button variant="contained"  color="primary" disabled={uploadFileReducer.uploadFlag} onClick={uploadStudentCsv} >
                                    导入数据库
                                </Button>}
                            </p>

                        </div>}
                        {/*大图*/}
                        <div style={{marginTop:'100px'}}>
                            <b style={{width:'60%',marginLeft:'20%'}}>考生导入模板字段的解释说明:</b>
                            <TableContainer component={Paper} style={{width:'60%',marginLeft:'20%'}}>
                            <Table  size={'small'} aria-label="a dense table">
                                <TableHead >
                                    <TableRow style={{height:50}}>
                                        <TableCell className={classes.head} align="center"></TableCell>
                                        <TableCell className={classes.head} align="center">考号</TableCell>
                                        <TableCell className={classes.head} align="center">入学年份</TableCell>
                                        <TableCell className={classes.head} align="center">姓名</TableCell>
                                        <TableCell className={classes.head} align="center">身份证号</TableCell>
                                        <TableCell className={classes.head} align="center">学校</TableCell>
                                        <TableCell className={classes.head} align="center">专业</TableCell>
                                        <TableCell className={classes.head} align="center">电话</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell align="center" ><b>例如</b></TableCell>
                                        <TableCell align="center" >210010001</TableCell>
                                        <TableCell align="center" >2021</TableCell>
                                        <TableCell align="center" >张三</TableCell>
                                        <TableCell align="center" >230301200101021516</TableCell>
                                        <TableCell align="center" >北京大学</TableCell>
                                        <TableCell align="center" >汉语言文学</TableCell>
                                        <TableCell align="center" >13812341234</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell align="center" ><b>解释说明</b></TableCell>
                                        <TableCell align="center" >考生考号不超过20位</TableCell>
                                        <TableCell align="center" >考生年份为整数</TableCell>
                                        <TableCell align="center" >姓名不超过10个字</TableCell>
                                        <TableCell align="center" >18位是身份证号码</TableCell>
                                        <TableCell align="center" >学校名称</TableCell>
                                        <TableCell align="center" >专业名称</TableCell>
                                        <TableCell align="center" >考生的联系电话</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value='3'>
                    {/*分类上传文件*/}
                    <div className='category'>
                        {/*按钮*/}
                        <Grid container xs={12} spacing={3}>
                            <Grid item xs={6} align='left'>
                                <Button variant="contained"  color="default" startIcon={<i className="mdi  mdi-download"></i>} onClick={() => {downLoadEmployeeCsv()}}>
                                    在职数据导入模板
                                </Button>
                            </Grid>
                            <Grid item xs={6} align='right'>
                                <CSVReader
                                    ref={buttonRef}
                                    noClick
                                    noDrag
                                    noProgressBar
                                    onFileLoad={handleOnEmployeeFileLoad}
                                >
                                    {( {file} ) => {
                                        setInputFileEmployee(file);
                                        return (
                                            <aside>
                                                <Button variant="contained"  color="primary" onClick={handleOpenDialog}>
                                                    批量在职数据导入
                                                </Button>
                                            </aside>
                                        )}}
                                </CSVReader>
                            </Grid>
                        </Grid>
                        {/*本地校验*/}
                        {dataBoxEmployee&&<div>
                            <p  xs={12} align='center' style={{padding: "20px",background:'#f50057',color:'white',fontSize:'18px'}}>错误数据<span>{errorNumberEmployee}</span>条，请修改后重新上传</p>
                            <TableContainer component={Paper}>
                                <Table  size={'small'} aria-label="a dense table">
                                    <TableHead >
                                        <TableRow style={{height:50}}>
                                            <TableCell className={classes.head} align="center">序号</TableCell>
                                            {headerArrayEmployee.map((row,index)=>(
                                                <TableCell key={'head-'+index} className={classes.head} align="center">{row}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tContentEmployee.map((item,index)=>(
                                            <TableRow key={'csv-'+index}>
                                                <TableCell align="center" >{index+1}</TableCell>
                                                {item.data.map((row)=>(
                                                    <TableCell key={index} align="center" >{row}</TableCell>
                                                ))}
                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>}
                        {/*上传校验*/}
                        {successDataEmployee&&<div>
                            <Divider style={{marginTop: 20}}/>
                            <p><span>{uploadFileReducer.employeeArray.successedInsert}</span>/<span>{dataLengthEmployee}</span></p>

                            {localSuccessEmployee&&<p align='center'>
                                <i className="mdi mdi-check "></i><span>本地校验成功</span>
                            </p>}
                            {uploadFileReducer.employeeUploadFlag&&<p align='center'>
                                <i className="mdi mdi-check"></i><span>上传完成</span>
                            </p>}
                            {uploadFileReducer.employeeUploadFlag&&<p align='center'>
                                <span>错误条数:<span>{uploadFileReducer.employeeArray.failedCase}</span></span>
                                <span>正确条数:<span>{uploadFileReducer.employeeArray.successedInsert}</span></span>
                                <span>总条数:<span>{dataLengthEmployee}</span></span>
                            </p>}
                            <p align='center'>
                                {localSuccessEmployee&&<Button variant="contained"  color="primary" disabled={uploadFileReducer.employeeUploadFlag} onClick={uploadEmployeeCsv} >
                                    导入数据库
                                </Button>}
                            </p>

                        </div>}
                        {/*大图*/}
                        <div style={{marginTop:'100px'}}>
                            <b style={{width:'90%',marginLeft:'5%'}}>在职导入模板字段的解释说明:</b>
                            <TableContainer component={Paper} style={{marginTop:'10px',width:'90%',marginLeft:'5%'}}>
                                <Table  size={'small'} aria-label="a dense table">
                                    <TableHead >
                                        <TableRow style={{height:50}}>
                                            <TableCell className={classes.head} align="center"></TableCell>
                                            <TableCell className={classes.head} align="center">姓名</TableCell>
                                            <TableCell className={classes.head} align="center">身份证号</TableCell>
                                            <TableCell className={classes.head} align="center">电话</TableCell>
                                            <TableCell className={classes.head} align="center">民族</TableCell>
                                            <TableCell className={classes.head} align="center">毕业年份</TableCell>
                                            <TableCell className={classes.head} align="center">学校</TableCell>
                                            <TableCell className={classes.head} align="center">专业</TableCell>
                                            <TableCell className={classes.head} align="center">学位</TableCell>
                                            <TableCell className={classes.head} align="center">单位</TableCell>
                                            <TableCell className={classes.head} align="center">单位性质</TableCell>
                                            <TableCell className={classes.head} align="center">职称</TableCell>
                                            <TableCell className={classes.head} align="center">职称层级</TableCell>
                                            <TableCell className={classes.head} align="center">备注</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell align="center" ><b>例如</b></TableCell>
                                            <TableCell className={classes.head} align="center">张三</TableCell>
                                            <TableCell className={classes.head} align="center">230301200101021516</TableCell>
                                            <TableCell className={classes.head} align="center">13812341234</TableCell>
                                            <TableCell className={classes.head} align="center">汉族</TableCell>
                                            <TableCell className={classes.head} align="center">2021</TableCell>
                                            <TableCell className={classes.head} align="center">北京大学</TableCell>
                                            <TableCell className={classes.head} align="center">汉语言文学</TableCell>
                                            <TableCell className={classes.head} align="center">本科</TableCell>
                                            <TableCell className={classes.head} align="center">鸡西市国税局</TableCell>
                                            <TableCell className={classes.head} align="center">机关</TableCell>
                                            <TableCell className={classes.head} align="center">中级会计师</TableCell>
                                            <TableCell className={classes.head} align="center">中级</TableCell>
                                            <TableCell className={classes.head} align="center">特殊引入人才</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell align="center" ><b>解释说明</b></TableCell>
                                            <TableCell className={classes.head} align="center">姓名不超过10个字</TableCell>
                                            <TableCell className={classes.head} align="center">18位是身份证号码</TableCell>
                                            <TableCell className={classes.head} align="center">联系电话</TableCell>
                                            <TableCell className={classes.head} align="center">民族信息</TableCell>
                                            <TableCell className={classes.head} align="center">年份为整数</TableCell>
                                            <TableCell className={classes.head} align="center">学校名称</TableCell>
                                            <TableCell className={classes.head} align="center">专业名称</TableCell>
                                            <TableCell className={classes.head} align="center">学位名称</TableCell>
                                            <TableCell className={classes.head} align="center">单位名称</TableCell>
                                            <TableCell className={classes.head} align="center">机关、事业、企业三选一</TableCell>
                                            <TableCell className={classes.head} align="center">职称</TableCell>
                                            <TableCell className={classes.head} align="center">初级、中级、高级三选一</TableCell>
                                            <TableCell className={classes.head} align="center">不超过100个字</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        uploadFileReducer: state.UpLoadFileReducer
    }
};
const mapDispatchToProps = (dispatch) => ({
    studentFileUpload:(inputFile)=>{
        dispatch(UpLoadFileAction.studentFileUpload(inputFile));
    },
    employeeFileUpload:(inputFileEmployee)=>{
        dispatch(UpLoadFileAction.employeeFileUpload(inputFileEmployee));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(UpLoadFile)