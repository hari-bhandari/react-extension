// ** React Imports
import {Link} from 'react-router-dom'
// ** Reactstrap Imports
import {Card, CardBody, Button} from 'reactstrap'
import React from "react"


const PreviewActions = ({setSendSidebarOpen, getImage}) => {

    return (
        <Card className='invoice-action-wrapper'>
            <CardBody>
                <Button color='primary' block className='mb-75' onClick={() => setSendSidebarOpen(true)}>
                    Send Invoice
                </Button>
                <Button color='secondary' block outline className='mb-75' onClick={() => {
                    getImage()
                }}>
                    Download
                </Button>

                <Button color='secondary' tag={Link} to='/apps/invoice/print' target='_blank' block outline className='mb-75'>
                    Print
                </Button>
            </CardBody>
        </Card>
    )
}

export default PreviewActions
