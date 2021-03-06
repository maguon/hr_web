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
        {name: '??????', type: 'string', require: true},
        {name: '????????????', type: 'number',require: true},
        {name: '??????', type: 'string',require: true},
        {name: '????????????', type: 'string',require: true},
        {name: '??????', type: 'string',require: true},
        {name: '??????', type: 'string',require: true},
        {name: '??????', type: 'string',require: true},
    ];
    const fileEmployeeParams = [
        {name: '??????', type: 'string', require: true},
        {name: '????????????', type: 'string',require: true},
        {name: '??????', type: 'number',require: true},
        {name: '??????', type: 'string',require: true},
        {name: '????????????', type: 'number',require: true},
        {name: '??????', type: 'string',require: true},
        {name: '??????', type: 'string',require: true},
        {name: '??????', type: 'string',require: true},
        {name: '??????', type: 'string',require: true},
        {name: '????????????', type: 'string',require: true},
        {name: '??????', type: 'string',require: true},
        {name: '????????????', type: 'string',require: true},
        {name: '??????', type: 'string',require: true},
    ];
    const handleOpenDialog = (e) => {
        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }
    const handleOnStudentFileLoad = (file,fileName)=>{
        let ext = fileName&&fileName.name.slice(fileName.name.lastIndexOf(".")+1).toLowerCase();
        if ("csv" != ext) { Swal.fire("??????????????????");
        } else {
            //????????????
            setHeaderArray(file[0].data);
            if(commonUtil.titleFilter(file[0].data,fileStudentParams) != false){
                // ??????????????????
                let content_filter_array = file.slice(1, file.length);
                let con_line = [];
                // excel????????????
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
                    Swal.fire("??????????????????"+ resultStudent.tableContentFilter.length+"???" );
                    // ?????????
                    setDataLength(resultStudent.tableContentFilter.length);
                    setLocalSuccess(true);
                } else {
                    setSuccessData(false);
                    setDataBox(true);
                    Swal.fire("????????????" + resultStudent.tableContentErrorFilter.length);
                }
            }else {
                Swal.fire("??????????????????", "", "error");
            }
        }
    }
    const handleOnEmployeeFileLoad =(file,fileName)=>{
        let ext = fileName&&fileName.name.slice(fileName.name.lastIndexOf(".")+1).toLowerCase();
        if ("csv" != ext) { Swal.fire("??????????????????");
        } else {
            //????????????
            setHeaderArrayEmployee(file[0].data);
            if(commonUtil.titleFilter(file[0].data,fileEmployeeParams) != false){
                // ??????????????????
                let content_filter_array = file.slice(1, file.length);
                let con_line = [];
                // excel????????????
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
                    Swal.fire("??????????????????"+ resultEmployee.tableContentFilter.length+"???" );
                    // ?????????
                    setDataLengthEmployee(resultEmployee.tableContentFilter.length);
                    setLocalSuccessEmployee(true);
                } else {
                    setSuccessDataEmployee(false);
                    setDataBoxEmployee(true);
                    Swal.fire("????????????" + resultEmployee.tableContentErrorFilter.length);
                }
            }else {
                Swal.fire("??????????????????", "", "error");
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
        window.open('/????????????????????????.csv')
    }
    const downLoadEmployeeCsv =()=>{
        window.open('/??????????????????????????????.csv')
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
                        <Tab label="????????????" value="1" />
                        <Tab label="??????????????????" value="2" />
                        <Tab label="??????????????????"   value="3" />
                    </Tabs>
                </AppBar>
                <TabPanel value='1'>
                    <Grid container xs={12} spacing={3} style={{marginTop:'50px'}}>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={6} style={{color:'#F44336',fontSize:'20px'}}>
                            <Grid item xs={12} align='center' style={{paddingBottom:'20px',borderBottom: '1px solid #ccc' ,fontSize:'30px',color:'#3f51b5'}} >??????????????????</Grid>
                            <Grid item xs={12} style={{marginTop:'30px',marginLeft:'30px'}}>
                                <i className="mdi  mdi-checkbox-multiple-blank-circle" style={{color:'#3f51b5'}}></i>
                                ??????????????????????????????csv???????????????,?????????excel???????????????????????????;
                            </Grid>
                            <Grid item xs={12} style={{marginTop:'30px',marginLeft:'30px'}}>
                                <i className="mdi  mdi-checkbox-multiple-blank-circle" style={{color:'#3f51b5'}}></i>
                                ?????????????????????,????????????????????????????????????????????????????????????????????????;
                            </Grid>
                            <Grid item xs={12} style={{marginTop:'30px',marginLeft:'30px'}}>
                                <i className="mdi  mdi-checkbox-multiple-blank-circle" style={{color:'#3f51b5'}}></i>
                                ???????????????????????????????????????(????????????)????????????(?????????);
                            </Grid>
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value='2'>
                    {/*??????????????????*/}
                    <div className='brand'>
                        {/*??????*/}
                        <Grid container xs={12} spacing={3}>
                            <Grid item xs={6} align='left'>
                                <Button variant="contained"  color="default" startIcon={<i className="mdi  mdi-download"></i>} onClick={() => {downLoadStudentCsv()}}>
                                    ??????????????????
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
                                                    ????????????????????????
                                                </Button>
                                            </aside>
                                        )}}
                                </CSVReader>
                            </Grid>
                        </Grid>
                        {/*????????????*/}
                        {dataBox&&<div>
                            <p  xs={12} align='center' style={{padding: "20px",background:'#f50057',color:'white',fontSize:'18px'}}>????????????<span>{errorNumber}</span>??????????????????????????????</p>
                            <TableContainer component={Paper}>
                                <Table  size={'small'} aria-label="a dense table">
                                    <TableHead >
                                        <TableRow style={{height:50}}>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
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
                        {/*????????????*/}
                        {successData&&<div>
                            <Divider style={{marginTop: 20}}/>
                            <p><span>{uploadFileReducer.array.successedInsert}</span>/<span>{dataLength}</span></p>

                            {localSuccess&&<p align='center'>
                                <i className="mdi mdi-check "></i><span>??????????????????</span>
                            </p>}
                            {uploadFileReducer.uploadFlag&&<p align='center'>
                                <i className="mdi mdi-check"></i><span>????????????</span>
                            </p>}
                            {uploadFileReducer.uploadFlag&&<p align='center'>
                                <span>????????????:<span>{uploadFileReducer.array.failedCase}</span></span>
                                <span>????????????:<span>{uploadFileReducer.array.successedInsert}</span></span>
                                <span>?????????:<span>{dataLength}</span></span>
                            </p>}
                            <p align='center'>
                                {localSuccess&& <Button variant="contained"  color="primary" disabled={uploadFileReducer.uploadFlag} onClick={uploadStudentCsv} >
                                    ???????????????
                                </Button>}
                            </p>

                        </div>}
                        {/*??????*/}
                        <div style={{marginTop:'100px'}}>
                            <b style={{width:'60%',marginLeft:'20%'}}>???????????????????????????????????????:</b>
                            <TableContainer component={Paper} style={{width:'60%',marginLeft:'20%'}}>
                            <Table  size={'small'} aria-label="a dense table">
                                <TableHead >
                                    <TableRow style={{height:50}}>
                                        <TableCell className={classes.head} align="center"></TableCell>
                                        <TableCell className={classes.head} align="center">??????</TableCell>
                                        <TableCell className={classes.head} align="center">????????????</TableCell>
                                        <TableCell className={classes.head} align="center">??????</TableCell>
                                        <TableCell className={classes.head} align="center">????????????</TableCell>
                                        <TableCell className={classes.head} align="center">??????</TableCell>
                                        <TableCell className={classes.head} align="center">??????</TableCell>
                                        <TableCell className={classes.head} align="center">??????</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                        <TableCell align="center" ><b>??????</b></TableCell>
                                        <TableCell align="center" >210010001</TableCell>
                                        <TableCell align="center" >2021</TableCell>
                                        <TableCell align="center" >??????</TableCell>
                                        <TableCell align="center" >230301200101021516</TableCell>
                                        <TableCell align="center" >????????????</TableCell>
                                        <TableCell align="center" >???????????????</TableCell>
                                        <TableCell align="center" >13812341234</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell align="center" ><b>????????????</b></TableCell>
                                        <TableCell align="center" >?????????????????????20???</TableCell>
                                        <TableCell align="center" >?????????????????????</TableCell>
                                        <TableCell align="center" >???????????????10??????</TableCell>
                                        <TableCell align="center" >18?????????????????????</TableCell>
                                        <TableCell align="center" >????????????</TableCell>
                                        <TableCell align="center" >????????????</TableCell>
                                        <TableCell align="center" >?????????????????????</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value='3'>
                    {/*??????????????????*/}
                    <div className='category'>
                        {/*??????*/}
                        <Grid container xs={12} spacing={3}>
                            <Grid item xs={6} align='left'>
                                <Button variant="contained"  color="default" startIcon={<i className="mdi  mdi-download"></i>} onClick={() => {downLoadEmployeeCsv()}}>
                                    ????????????????????????
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
                                                    ????????????????????????
                                                </Button>
                                            </aside>
                                        )}}
                                </CSVReader>
                            </Grid>
                        </Grid>
                        {/*????????????*/}
                        {dataBoxEmployee&&<div>
                            <p  xs={12} align='center' style={{padding: "20px",background:'#f50057',color:'white',fontSize:'18px'}}>????????????<span>{errorNumberEmployee}</span>??????????????????????????????</p>
                            <TableContainer component={Paper}>
                                <Table  size={'small'} aria-label="a dense table">
                                    <TableHead >
                                        <TableRow style={{height:50}}>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
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
                        {/*????????????*/}
                        {successDataEmployee&&<div>
                            <Divider style={{marginTop: 20}}/>
                            <p><span>{uploadFileReducer.employeeArray.successedInsert}</span>/<span>{dataLengthEmployee}</span></p>

                            {localSuccessEmployee&&<p align='center'>
                                <i className="mdi mdi-check "></i><span>??????????????????</span>
                            </p>}
                            {uploadFileReducer.employeeUploadFlag&&<p align='center'>
                                <i className="mdi mdi-check"></i><span>????????????</span>
                            </p>}
                            {uploadFileReducer.employeeUploadFlag&&<p align='center'>
                                <span>????????????:<span>{uploadFileReducer.employeeArray.failedCase}</span></span>
                                <span>????????????:<span>{uploadFileReducer.employeeArray.successedInsert}</span></span>
                                <span>?????????:<span>{dataLengthEmployee}</span></span>
                            </p>}
                            <p align='center'>
                                {localSuccessEmployee&&<Button variant="contained"  color="primary" disabled={uploadFileReducer.employeeUploadFlag} onClick={uploadEmployeeCsv} >
                                    ???????????????
                                </Button>}
                            </p>

                        </div>}
                        {/*??????*/}
                        <div style={{marginTop:'100px'}}>
                            <b style={{width:'90%',marginLeft:'5%'}}>???????????????????????????????????????:</b>
                            <TableContainer component={Paper} style={{marginTop:'10px',width:'90%',marginLeft:'5%'}}>
                                <Table  size={'small'} aria-label="a dense table">
                                    <TableHead >
                                        <TableRow style={{height:50}}>
                                            <TableCell className={classes.head} align="center"></TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell align="center" ><b>??????</b></TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">230301200101021516</TableCell>
                                            <TableCell className={classes.head} align="center">13812341234</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">2021</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">???????????????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">??????????????????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">???????????????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">??????????????????</TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell align="center" ><b>????????????</b></TableCell>
                                            <TableCell className={classes.head} align="center">???????????????10??????</TableCell>
                                            <TableCell className={classes.head} align="center">18?????????????????????</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">???????????????</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">????????????</TableCell>
                                            <TableCell className={classes.head} align="center">?????????????????????????????????</TableCell>
                                            <TableCell className={classes.head} align="center">??????</TableCell>
                                            <TableCell className={classes.head} align="center">?????????????????????????????????</TableCell>
                                            <TableCell className={classes.head} align="center">?????????100??????</TableCell>
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