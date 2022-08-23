// ** React Imports
import {useState, createRef} from 'react'
import {useParams, Link} from 'react-router-dom'

// ** Third Party Components

// ** Reactstrap Imports
import {Row, Col, Alert} from 'reactstrap'

// ** Invoice Preview Components
import PreviewCard from './PreviewCard'
import PreviewActions from './PreviewActions'
import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'

// ** Styles
import '@styles/base/pages/app-invoice.scss'
import useAxios from "axios-hooks"
import {PUBLIC_API_URL} from "@src/config"
import {useScreenshot} from "use-react-screenshot"

const InvoicePreview = () => {
    const ref = createRef()
    // ** HooksVars
    const {id} = useParams()
    const [image, takeScreenShot] = useScreenshot()

    const getImage = () => {
        takeScreenShot(ref.current)
        console.log(image)
    }

    const [{data, loading, error}] = useAxios(`${PUBLIC_API_URL}/api/order/${id}`)
    console.log(data)
    const [sendSidebarOpen, setSendSidebarOpen] = useState(false)

    // ** Functions to toggle add & send sidebar
    const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen)

    if (loading) return <div>Loading...</div>
    if (error) return <Alert color='danger'>
        <h4 className='alert-heading'>Invoice not found</h4>
        <div className='alert-body'>
            Invoice with id: {id} doesn't exist. Check list of all invoices:{' '}
            <Link to='/apps/invoice/list'>Invoice List</Link>
        </div>
    </Alert>
    // ** Get invoice on mount based on id


    return data !== null && data !== undefined ? (
        <div className='invoice-preview-wrapper'>
            <Row className='invoice-preview'>
                <Col xl={9} md={8} sm={12}>
                    <PreviewCard data={data} ref={ref}/>
                </Col>
                <Col xl={3} md={4} sm={12}>
                    <PreviewActions setSendSidebarOpen={setSendSidebarOpen} getImage={getImage}/>
                </Col>
            </Row>
            <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} companyEmail={data.email} companyName={data.name}/>
        </div>
    ) : (
        <Alert color='danger'>
            <h4 className='alert-heading'>Invoice not found</h4>
            <div className='alert-body'>
                Invoice with id: {id} doesn't exist. Check list of all invoices:{' '}
                <Link to='/apps/invoice/list'>Invoice List</Link>
            </div>
        </Alert>
    )
}

export default InvoicePreview
