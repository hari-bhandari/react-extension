// ** React Imports
import {useState} from 'react'

// ** Third Party Components
import Chart from 'react-apexcharts'
// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    CardTitle
} from 'reactstrap'

const RevenueReport = props => {
    // ** State
    const [data] = useState({
        years: ['2020', '2019', '2018'],
        price: '25,852',
        budget: '56,800'
    })


    const revenueOptions = {
            chart: {
                stacked: true,
                type: 'bar',
                toolbar: {show: true}
            },
            grid: {
                padding: {
                    top: -20,
                    bottom: -10
                },
                yaxis: {
                    lines: {show: true}
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        colors: '#b9b9c3',
                        fontSize: '0.86rem'
                    }
                },
                axisTicks: {
                    show: true
                },
                axisBorder: {
                    show: true
                }
            },
            legend: {
                show: true
            },
            dataLabels: {
                enabled: false
            },
            colors: [props.primary, props.warning],
            plotOptions: {
                bar: {
                    columnWidth: '17%',
                    borderRadius: [5]
                },
                distributed: true
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#b9b9c3',
                        fontSize: '0.86rem'
                    }
                }
            }
        },
        revenueSeries = [
            {
                name: 'Total Sales',
                data: props.revenue
            }

        ]


    return data !== null ? (
        <Card className='card-revenue-budget'>
            <Row className='mx-0'>
                <Col className='revenue-report-wrapper' md='12' xs='12'>
                    <div className='d-sm-flex justify-content-between align-items-center mb-3'>
                        <CardTitle className='mb-50 mb-sm-0'>Revenue Report</CardTitle>
                        <div className='d-flex align-items-center'>
                            <div className='d-flex align-items-center me-2'>
                                <span className='bullet bullet-primary me-50 cursor-pointer'></span>
                                <span>Total Sales</span>
                            </div>
                        </div>
                    </div>
                    <Chart id='revenue-report-chart' type='bar' height='230' options={revenueOptions} series={revenueSeries}/>
                </Col>
            </Row>
        </Card>
    ) : null
}

export default RevenueReport
