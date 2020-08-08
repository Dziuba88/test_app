import React, {Component} from "react";
import moment from "moment";

import ReactLightCalendar from "@lls/react-light-calendar";
import ReactEcharts from "echarts-for-react";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.updateInterval = 10000;
    this.state = {
      startDate: 0,
      endDate: 0,
      minDate: 0,
      maxDate: 0,
      chartsData: [],
    };
  }

  componentDidMount = () => {
    this.generateData(30);

    this.timer = setInterval(() => {
      this.pseudoFetch()
    }, this.updateInterval);
  }

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }

  randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

  sortData = data => {
    data.sort(function compare(a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
  }

  onChange = (startDate, endDate) => this.setState({startDate, endDate});

  generateData = (count) => {
    const chartsData = [];
    const OneDay = 24 * 60 * 60 * 1000;

    let xValue = +moment.utc().format('x');

    let i = 0;
    while (i < count) {
      chartsData.push({
        date: xValue -= OneDay,
        sales: this.randomNumber(50, 250),
        clients: this.randomNumber(75, 300),
        mdl: this.randomNumber(100, 700),
        usd: this.randomNumber(100, 500),
        eur: this.randomNumber(100, 500),
        usdRate: (this.randomNumber(1600, 1700) / 100).toFixed(2),
        eurRate: (this.randomNumber(1800, 2000) / 100).toFixed(2)
      });

      i++
    }

    let minDate = chartsData[0].date;
    let maxDate = minDate;

    chartsData.forEach(el => {
      if (el.date > maxDate) maxDate = el.date;
      if (el.date < minDate) minDate = el.date;
    })

    const startDate = minDate
    const endDate = maxDate

    this.sortData(chartsData)

    chartsData.sort((a, b) => a.date - b.date);

    this.setState({
      minDate,
      maxDate,
      endDate,
      startDate,
      chartsData
    })
  }

  filterData = () => {
    const {chartsData, startDate, endDate } = this.state

    if (startDate > 0 && endDate ) {
      const filteredData = [];

      chartsData.forEach(el => {
        if(el.date !== undefined && el.date >= startDate && el.date <= endDate) filteredData.push(el);
      })

      return filteredData
    } else {
      return chartsData
    }
  }

  barChartOptions = () => {
    const dates = [], sales = [], clients = [];
    const data = this.filterData()

    data.forEach(el => {
      dates.push( el.date)
      sales.push(el.sales)
      clients.push(el.clients)
    })

    return {
      tooltip: {
        trigger: 'axis',
        formater: (params => {
          let res = moment.utc( parseInt(params[0].name) ).format("MMM DD, YYYY,  HH:mm")
          params.forEach( param => res += `'<br/>'${param.marker} ${param.seriesName} : ${param.value}` )
          return res
        })
      },
      legend: { data:[ 'Sales', 'Clients' ] },
      color: ["#036646", "#61a60e"],
      grid: {
        left: 0,
        top: 40,
        right: 0,
        bottom: 40
      },
      yAxis: {
        boundaryGap: false,
        scale: true,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      xAxis: {
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        data: dates
      },
      series: [
        { name: 'Sales', type: 'bar', data: sales },
        { name: 'Clients', type: 'line', smooth: true, symbolSize: 16, data: clients }
      ]
    }
  }

  pieChartOptions = () => {
    const data = this.filterData()

    let mdlSumm = 0, usdSumm = 0, eurSumm = 0;

    data.forEach(el => {
      mdlSumm += el.mdl
      usdSumm += el.usd
      eurSumm += el.eur
    })

    return {
      title: {
        text: 'Transactions count',
        left: 'center',
        textStyle: {
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}  : {c} ({d}%)'
      },
      legend: { top: 40 },
      series: [
        {
          name: 'Transactions',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: mdlSumm, name: 'MDL'},
            {value: usdSumm, name: 'USD'},
            {value: eurSumm, name: 'EUR'},
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

  }

  lineChartOptions = () => {
    const data = this.filterData()
    const dates = [], usdRates = [], eurRates = [];

    data.forEach(el => {
      dates.push(el.date)
      usdRates.push(el.usdRate)
      eurRates.push(el.eurRate)
    })

    return {
      title: { text: 'Курс валют', left: 'center', textStyle: { fontWeight: 'normal' } },
      tooltip: {
        trigger: 'axis',
        formatter: (params => {
          let res = moment.utc( parseInt(params[0].name) ).format("DD.MM.YY");
          params.forEach(param => {
            res += `<br/>${param.marker} ${param.seriesName} = ${param.value} MDL`;
          })
          return res
        })
      },
      legend: { top: 30 },
      grid: {
        top: 60,
        left: 0,
        right: 0,
        bottom: 20,
        show: false ,
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: false,
        axisLabel: {
          formatter: value => moment.utc( parseInt(value) ).format("DD.MM.YY"),
          showMinLabel: false,
          showMaxLabel: false,
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
        scale: true,
        splitNumber: 5,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      series: [
        {
          name: 'EUR',
          type: 'line',
          data: eurRates,
          smooth: true,
          showSymbol: false,
        },
        {
          name: 'USD',
          type: 'line',
          data: usdRates,
          smooth: true,
          showSymbol: false,
        }
      ]
    };
  }


  pseudoFetch = () => {
    const newData = this.state.chartsData;

    newData.forEach(item => {
      item.sales =  this.randomNumber(50, 250)
      item.clients =  this.randomNumber(75, 300)
      item.mdl =  this.randomNumber(100, 700)
      item.usd =  this.randomNumber(100, 500)
      item.eur =  this.randomNumber(100, 500)
      item.usdRate =  (this.randomNumber(1600, 1700) / 100).toFixed(2)
      item.eurRate =  (this.randomNumber(1800, 2000) / 100).toFixed(2)
    })

    this.setState({chartsData: newData})

  }

  render = () => {
    const {startDate, endDate, maxDate, minDate} = this.state;

    return (
      <div className="dashboard">
        <div className="dashboard__header">
          <h1>Dashboard
            <small>
              {this.state.startDate ? moment.utc(startDate).format("MMM DD, YYYY | HH:mm") : 'Select start date'}
              &nbsp;&nbsp;—&nbsp;&nbsp;
              {this.state.endDate ? moment.utc(endDate).format("MMM DD, YYYY | HH:mm") : 'Select end date'}
            </small>
          </h1>
        </div>
        <div className="dashboard__row">
          <div className="col">
            <ReactLightCalendar
              onChange={this.onChange}
              startDate={startDate}
              endDate={endDate}
              displayTime
              disableDates={(date) => (date > maxDate || date < minDate) ? date : false }
              {...this.props}
            />
          </div>
          <div className="col flex"> </div>
          <div className="col">
            <ReactEcharts option={ this.pieChartOptions() } style={{ height: "320px", width: "320px" }} />
          </div>
        </div>
        <div className="dashboard__row">
          <div className="col flex">
            <ReactEcharts option={ this.lineChartOptions() } style={{ height: "320px", width: "100%" }} />
          </div>
        </div>
        <div className="dashboard__row">
          <div className="col flex">
            <ReactEcharts option={ this.barChartOptions() } style={{ height: "320px", width: "100%" }} />
          </div>
        </div>
      </div>
    )
  }

};
