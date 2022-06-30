import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import ReactECharts from 'echarts-for-react';
import {Divider, Grid, makeStyles, MenuItem, Paper, Select, Typography} from "@material-ui/core";

const employeeStatAction = require('../../actions/main/EmployeeStatAction');
const sysConst = require('../../utils/SysConst');
const customTheme = require('../layout/Theme').customTheme;
const useStyles = makeStyles((theme) => ({
    root: customTheme.root,
    title: customTheme.pageTitle,
    divider: customTheme.pageDivider,
    tableHead: customTheme.tableHead
}));

function EmployeeStat(props) {
    const {employeeStatReducer, getEmployeeStatByYear, getEmployeeStatByGender,
        getEmployeeStatByDegree,getEmployeeStatByPosType,getEmployeeStatByComType} = props;
    const classes = useStyles();

    const [dateRange, setDateRange] = React.useState(sysConst.DATE_RANGE[0].value);
    const [monthOption, setMonthOption] = React.useState({});
    const [dayOption, setDayOption] = React.useState({});
    const [yearOption, setYearOption] = React.useState({});
    const [genderOption, setGenderOption] = React.useState({});
    const [degreeOption, setDegreeOption] = React.useState({});
    const [comOption, setComOption] = React.useState({});
    const [posOption, setPosOption] = React.useState({});

    // 执行1次，取得数结构
    useEffect(() => {
        getEmployeeStatByYear(sysConst.DATE_RANGE[0].value);
        getEmployeeStatByGender();
        getEmployeeStatByDegree();
        getEmployeeStatByPosType();
        getEmployeeStatByComType();
        console.log(employeeStatReducer)
    }, []);

    useEffect(() => {
        if (employeeStatReducer.statEmployeeByYear.length > 0) {
            setYearOpt();
        }
    }, [employeeStatReducer.statEmployeeByYear.length]);
    useEffect(() => {
        if (employeeStatReducer.statEmployeeByGender.length > 0) {
            setGenderOpt();
        }
    }, [employeeStatReducer.statEmployeeByGender.length]);
    useEffect(() => {
        if (employeeStatReducer.statEmployeeByDegree.length > 0) {
            setDegreeOpt();
        }
    }, [employeeStatReducer.statEmployeeByDegree.length]);

    useEffect(() => {
        if (employeeStatReducer.statEmployeeByComType.length > 0) {
            setComOpt();
        }
    }, [employeeStatReducer.statEmployeeByComType.length]);

    useEffect(() => {
        if (employeeStatReducer.statEmployeeByPosType.length > 0) {
            setPosOpt();
        }
    }, [employeeStatReducer.statEmployeeByPosType.length]);

    const setYearOpt = () => {
        let xAxis = {data: []};
        let series = [{name: '人数', type: 'bar', data: [],itemStyle: {color: '#3C3CC4'}}];
        for (let item of employeeStatReducer.statEmployeeByYear.values()) {
            xAxis.data.push(item.grad_year);
            series[0].data.push(item.employee_count);
        }
        // 反转
        xAxis.data.reverse();
        series[0].data.reverse();
        setYearOption(createOption('', ['人数'], xAxis, series));
    };

    const setGenderOpt = () => {
        let genderData =[];
        for (let item of employeeStatReducer.statEmployeeByGender.values()) {
            if(item.gender==1){
                genderData.push( {value:item.employee_count, name:'男'},)
            }else{
                genderData.push( {value:item.employee_count, name:'女'},)                 
            }
        }
        console.log(genderData)
        const option = {
            title : {
                text: '系统内在职男女比例',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['男','女',]
            },
            series : [
                {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:genderData,
                itemStyle: {
                    emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
                }
            ]
        };
        setGenderOption(option);
    };
    const setDegreeOpt = ()=>{
        let degreeData =[];
        let degreeSeriesData =[]
        for (let item of employeeStatReducer.statEmployeeByDegree.values()) {           
            degreeData.push( {value:item.employee_count, name:item.degree},)
            degreeSeriesData.push(item.degree)
        }
        const option = {
            title : {
                text: '系统内在职学历比例',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: degreeSeriesData
            },
            series : [
                {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:degreeData,
                itemStyle: {
                    emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
                }
            ]
        };
        setDegreeOption(option);
    }
    const setComOpt = ()=>{
        let comTypeData =[];
        let comTypeSeriesData =[]
        for (let item of employeeStatReducer.statEmployeeByComType.values()) {           
            for(let i =0;i< sysConst.COMPANY_TYPE.length; i++){
               console.log(sysConst.COMPANY_TYPE[i])
               console.log(item)
                if(item.company_type == sysConst.COMPANY_TYPE[i].value){
                    comTypeData.push( {value:item.employee_count, name:sysConst.COMPANY_TYPE[i].label},)
                    comTypeSeriesData.push(sysConst.COMPANY_TYPE[i].label);
                    break;
                }
            }           
        }
        console.log(comTypeData)
        console.log(comTypeSeriesData)
        const option = {
            title : {
                text: '系统内在职单位比例',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: comTypeSeriesData
            },
            series : [
                {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:comTypeData,
                itemStyle: {
                    emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
                }
            ]
        };
        setComOption(option);
    }
    const setPosOpt = ()=>{
        let posTypeData =[];
        let posTypeSeriesData =[]
        for (let item of employeeStatReducer.statEmployeeByPosType.values()) {           
            for(let i =0;i< sysConst.POS_TYPE.length; i++){
               console.log(sysConst.POS_TYPE[i])
               console.log(item)
                if(item.pos_type == sysConst.POS_TYPE[i].value){
                    posTypeData.push( {value:item.employee_count, name:sysConst.POS_TYPE[i].label},)
                    posTypeSeriesData.push(sysConst.POS_TYPE[i].label);
                    break;
                }
            }           
        }
        console.log(posTypeData)
        console.log(posTypeSeriesData)
        const option = {
            title : {
                text: '系统内在职层级比例',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: posTypeSeriesData
            },
            series : [
                {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:posTypeData,
                itemStyle: {
                    emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
                }
            ]
        };
        setPosOption(option);
    }
    /* const setMonthOpt = () => {
        let xAxis = {data: []};
        let series = [{name: '金额', type: 'bar', data: [],itemStyle: {color: '#3C3CC4'}},{name: '订单数', type: 'bar', data: [], itemStyle: {color: '#f84f55'}}];
        for (let item of orderStatReducer.statOrderByMonth.values()) {
            xAxis.data.push(item.y_month);
            series[0].data.push(item.service_price);
            series[1].data.push(item.count);
        }
        // 反转
        xAxis.data.reverse();
        series[0].data.reverse();
        series[1].data.reverse();
        setMonthOption(createOption('', ['金额','订单数'], xAxis, series));
    };

    const setDayOpt = () => {
        let xAxis = {data: []};
        let series = [{name: '金额', type: 'bar',data: [],itemStyle: {color: '#3C3CC4'}},{name: '订单数', type: 'bar', data: [],itemStyle: {color: '#f84f55'}}];
        for (let item of orderStatReducer.statOrderByDay.values()) {
            xAxis.data.push(item.id);
            series[0].data.push(item.service_price);
            series[1].data.push(item.count);
        }
        // 反转
        xAxis.data.reverse();
        series[0].data.reverse();
        series[1].data.reverse();
        setDayOption(createOption('',  ['金额','订单数'], xAxis, series));
    }; */

    const createOption = (title, legend, xAxis, series) => {
        return {
            title: {text: title},
            tooltip: {},
            legend: {data: legend},
            xAxis: xAxis,
            yAxis: {},
            series: series
        };
    };

    return (
        <div className={classes.root}>
            {/* 标题部分 */}
            <Typography gutterBottom className={classes.title}>在职统计</Typography>
            <Divider light className={classes.divider}/>

            <Paper elevation={3}>
                <Paper style={{background: '#F9F9F9'}} variant="outlined" >
                    <Grid container spacing={2}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} style={{padding: 10}}>按性别统计</Grid>
                            <Grid item xs={6} style={{padding: 10}}>按学位统计</Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={6} style={{padding: 10}}>
                                <ReactECharts style={{height: 400}} option={genderOption}/>
                            </Grid>
                            <Grid item xs={6} style={{padding: 10}}>
                                <ReactECharts style={{height: 400}} option={degreeOption}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
               
                
            </Paper>
            <Paper elevation={3}>
                <Paper style={{background: '#F9F9F9'}} variant="outlined" >
                <Grid container spacing={2}>
                        <Grid container spacing={1}>
                            <Grid item xs={6} style={{padding: 10}}>按单位性质统计</Grid>
                            <Grid item xs={6} style={{padding: 10}}>按职称层级统计</Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={6} style={{padding: 10}}>
                                <ReactECharts style={{height: 400}} option={comOption}/>
                            </Grid>
                            <Grid item xs={6} style={{padding: 10}}>
                                <ReactECharts style={{height: 400}} option={posOption}/>
                            </Grid>
                        </Grid>
                    </Grid>
                   
                </Paper>
               
                
            </Paper>
            <Paper elevation={3}>
                <Paper style={{background: '#f9f9f9'}} variant="outlined">
                    <Grid container spacing={0}>
                        <Grid item xs={6} style={{padding: 10}}>按毕业年份统计</Grid>
                    </Grid>
                </Paper>
                <ReactECharts  style={{height: 400}} option={yearOption}/>
            </Paper>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        employeeStatReducer: state.EmployeeStatReducer,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getEmployeeStatByYear: (size) => {
        dispatch(employeeStatAction.getEmployeeStatByYear())
    },
    getEmployeeStatByGender: () => {
        dispatch(employeeStatAction.getEmployeeStatByGender())
    },
    getEmployeeStatByDegree: () => {
        dispatch(employeeStatAction.getEmployeeStatByDegree())
    },
    getEmployeeStatByComType: () => {
        dispatch(employeeStatAction.getEmployeeStatByComType())
    },
    getEmployeeStatByPosType: () => {
        dispatch(employeeStatAction.getEmployeeStatByPosType())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeStat)