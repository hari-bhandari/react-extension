// ** React Imports
import {useContext} from 'react'
// ** Reactstrap Imports
import {Row, Col} from 'reactstrap'

// ** Context
import {ThemeColors} from '@src/utility/context/ThemeColors'

// ** Demo Components
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import RevenueReport from '@src/views/ui-elements/cards/analytics/RevenueReport'
import CompanyTable from './CompanyTable'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import useAxios from "axios-hooks"
import {PUBLIC_API_URL} from "@src/config"
const EcommerceDashboard = () => {
    const [{data, loading, error}] = useAxios(`${PUBLIC_API_URL}/api/product/dashboard`)
    // ** Context
    const {colors} = useContext(ThemeColors)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error!</div>

    return (
        <div id='dashboard-ecommerce'>
            <Row className='match-height'>

                <Col xl='12' md='12' xs='12'>
                    <StatsCard cols={{xl: '3', sm: '6'}} users={data.totalUsersAdded} products={data.totalProductsAdded} companies={data.totalCompanies} revenue={data.totalRevenue}/>
                </Col>
            </Row>

            <Row className='match-height'>
                <Col lg='12' md='12'>
                    <RevenueReport primary={colors.primary.main} warning={colors.warning.main} revenue={data.revenue}/>
                </Col>
            </Row>
            <Row className='match-height'>
                <Col lg='12' xs='12'>

                    {/*  header and center it*/}
                    <h2 className={"m-auto"}>Our top 5 companies by active users</h2>
                    <CompanyTable data={data.topCompanies}/>
                </Col>

            </Row>
        </div>
    )
}

export default EcommerceDashboard
