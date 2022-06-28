import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import ReactECharts from 'echarts-for-react';
import {Divider, Grid, makeStyles, MenuItem, Paper, Select, Typography} from "@material-ui/core";

const studentStatAction = require('../../actions/main/StudentStatAction');
const sysConst = require('../../utils/SysConst');
const customTheme = require('../layout/Theme').customTheme;
const useStyles = makeStyles((theme) => ({
    root: customTheme.root,
    title: customTheme.pageTitle,
    divider: customTheme.pageDivider,
    tableHead: customTheme.tableHead
}));

function StudentStat(props) {
    const {studentStatReducer, getStudentStatByYear, getStudentStatByGender} = props;
    const classes = useStyles();

    const [dateRange, setDateRange] = React.useState(sysConst.DATE_RANGE[0].value);
    const [monthOption, setMonthOption] = React.useState({});
    const [dayOption, setDayOption] = React.useState({});
    const [yearOption, setYearOption] = React.useState({});
    const [genderOption, setGenderOption] = React.useState({});

    // 执行1次，取得数结构
    useEffect(() => {
        getStudentStatByYear(sysConst.DATE_RANGE[0].value);
        getStudentStatByGender();
        console.log(studentStatReducer)
    }, []);

    useEffect(() => {
        if (studentStatReducer.statStudentByYear.length > 0) {
            setYearOpt();
        }
    }, [studentStatReducer.statStudentByYear.length]);
    useEffect(() => {
        if (studentStatReducer.statStudentByGender.length > 0) {
            setGenderOpt();
        }
    }, [studentStatReducer.statStudentByGender.length]);

    const setYearOpt = () => {
        let xAxis = {data: []};
        let series = [{name: '人数', type: 'bar', data: [],itemStyle: {color: '#3C3CC4'}}];
        for (let item of studentStatReducer.statStudentByYear.values()) {
            xAxis.data.push(item.college_year);
            series[0].data.push(item.student_count);
        }
        // 反转
        xAxis.data.reverse();
        series[0].data.reverse();
        setYearOption(createOption('', ['人数'], xAxis, series));
    };

    const setGenderOpt = () => {
        let genderData =[];
        for (let item of studentStatReducer.statStudentByGender.values()) {
            if(item.gender==1){
                genderData.push( {value:item.student_count, name:'男'},)
            }else{
                genderData.push( {value:item.student_count, name:'女'},)                 
            }
        }
        const option = {
            title : {
                text: '某站点用户访问来源',
                subtext: '纯属虚构',
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
            <Typography gutterBottom className={classes.title}>学生统计</Typography>
            <Divider light className={classes.divider}/>

            <Paper elevation={3}>
                <Paper style={{background: '#F9F9F9'}} variant="outlined">
                    <Grid container spacing={0}>
                        <Grid item xs={6} style={{padding: 10}}>按性别统计</Grid>
                    </Grid>
                </Paper>
                <ReactECharts style={{height: 400}} option={genderOption}/>
            </Paper>

            <Paper elevation={3}>
                <Paper style={{background: '#f9f9f9'}} variant="outlined">
                    <Grid container spacing={0}>
                        <Grid item xs={6} style={{padding: 10}}>按入学年份统计</Grid>
                    </Grid>
                </Paper>
                <ReactECharts  style={{height: 400}} option={yearOption}/>
            </Paper>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        studentStatReducer: state.StudentStatReducer,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getStudentStatByYear: (size) => {
        dispatch(studentStatAction.getStudentStatByYear())
    },
    getStudentStatByGender: () => {
        dispatch(studentStatAction.getStudentStatByGender())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentStat)