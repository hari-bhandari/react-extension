// ** Reactstrap Imports
import {Card, CardBody, CardText, Row, Col, Table} from 'reactstrap'
import React from "react"

const PreviewCard = React.forwardRef(({data}, ref) => {
    return data !== null ? (
        <>
            <div ref={ref} style={{width: "738px", margin: "auto"}}>
                <Card className='invoice-preview-card'>
                    <CardBody className='invoice-padding pb-0'>
                        {/* Header */}
                        <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                            <div>
                                <div className='logo-wrapper'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="80"
                                        height="80"
                                        x="0"
                                        y="0"
                                        version="1.1"
                                        viewBox="0 0 176 176"
                                        xmlSpace="preserve"
                                    >
                                        <linearGradient
                                            id="SVGID_1_"
                                            x1="27.949"
                                            x2="119.004"
                                            y1="172.211"
                                            y2="14.5"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0" stopColor="#0400DB"></stop>
                                            <stop offset="1" stopColor="#01F8FF"></stop>
                                        </linearGradient>
                                        <path
                                            fill="url(#SVGID_1_)"
                                            fillRule="evenodd"
                                            d="M24.848 9.789h64.883c21.79 0 41.595 8.909 55.948 23.263C160.033 47.406 168.942 67.21 168.942 89c0 21.789-8.909 41.595-23.263 55.948-14.354 14.354-34.159 23.263-55.948 23.263H24.848c-3.947 0-7.531-1.61-10.124-4.204a14.284 14.284 0 01-4.204-10.124V24.117c0-3.947 1.61-7.531 4.204-10.124s6.177-4.204 10.124-4.204zm54.389 13.549l.02-.031h-5.609c-8.897-.04-17.939-.032-27.056 0H24.848a.807.807 0 00-.567.243.807.807 0 00-.243.568v129.766c0 .215.093.417.243.567.15.15.352.243.567.243h56.729v-45.428H25.086l69.771-85.754v45.223h57.185l-1.483 2.322.927-2.29-69.906 85.92c15.548.644 25.618-1.085 37.998-7.09l.066-.162a66.29 66.29 0 0016.477-12.044c11.91-11.91 19.303-28.332 19.303-46.391s-7.392-34.481-19.303-46.391c-10.773-10.773-25.237-17.849-41.265-19.102v.002c-5.14-.079-10.351-.134-15.619-.171zM24.99 109.266h-.598l.933-1.462-.335 1.462z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>

                                    <h3 className='text-primary invoice-logo'>Dashing Distribution</h3>
                                </div>
                                <CardText className='mb-25'>St Martins Courtyard</CardText>
                                <CardText className='mb-25'> Coney St,York YO1 9QL</CardText>
                                <CardText className='mb-0'><a href="mailto:support@dashingdisty.com">support@dashingdisty.com</a>, </CardText>
                            </div>
                            <div className='mt-md-0 mt-2'>
                                <h4 className='invoice-title'>
                                    Invoice <span className='invoice-number'>#{data._id}</span>
                                </h4>
                                <div className='invoice-date-wrapper'>
                                    <p className='invoice-date-title'>Date Issued:</p>
                                    <p className='invoice-date'>{data.created}</p>
                                </div>
                                <div className='invoice-date-wrapper'>
                                    <p className='invoice-date-title'>Due Date:</p>
                                    <p className='invoice-date'>{data.created}</p>
                                </div>
                            </div>
                        </div>
                        {/* /Header */}
                    </CardBody>

                    <hr className='invoice-spacing'/>

                    {/* Address and Contact */}
                    <CardBody className='invoice-padding pt-0'>
                        <Row className='invoice-spacing'>
                            <Col className='p-0' xl='8'>
                                <h6 className='mb-2'>Invoice To:</h6>
                                <h6 className='mb-25'>{data.company.name}</h6>
                                <CardText className='mb-25'>{data.shippingAddress.address1}</CardText>
                                <CardText className='mb-25'>{data.shippingAddress.city},{data.shippingAddress.postcode}</CardText>
                                <CardText className='mb-25'>{data.shippingAddress.country}</CardText>
                                <CardText className='mb-0'>{data.company.email}</CardText>
                            </Col>
                            {/*<Col className='p-0 mt-xl-0 mt-2' xl='4'>*/}
                            {/*    <h6 className='mb-2'>Payment Details:</h6>*/}
                            {/*    <table>*/}
                            {/*        <tbody>*/}
                            {/*        <tr>*/}
                            {/*            <td className='pe-1'>Total Due:</td>*/}
                            {/*            <td>*/}
                            {/*                <span className='fw-bold'>{data.total}</span>*/}
                            {/*            </td>*/}
                            {/*        </tr>*/}
                            {/*        <tr>*/}
                            {/*            <td className='pe-1'>Bank name:</td>*/}
                            {/*            <td>{data.paymentDetails.bankName}</td>*/}
                            {/*        </tr>*/}
                            {/*        <tr>*/}
                            {/*            <td className='pe-1'>Country:</td>*/}
                            {/*            <td>{data.paymentDetails.country}</td>*/}
                            {/*        </tr>*/}
                            {/*        <tr>*/}
                            {/*            <td className='pe-1'>IBAN:</td>*/}
                            {/*            <td>{data.paymentDetails.iban}</td>*/}
                            {/*        </tr>*/}
                            {/*        <tr>*/}
                            {/*            <td className='pe-1'>SWIFT code:</td>*/}
                            {/*            <td>{data.paymentDetails.swiftCode}</td>*/}
                            {/*        </tr>*/}
                            {/*        </tbody>*/}
                            {/*    </table>*/}
                            {/*</Col>*/}
                        </Row>
                    </CardBody>
                    {/* /Address and Contact */}

                    {/* Invoice Description */}
                    <Table responsive>
                        <thead>
                        <tr>
                            <th className='py-1'>Product Name</th>
                            <th className='py-1'>Rate</th>
                            <th className='py-1'>Quantity</th>
                            <th className='py-1'>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.orderItems.map((item) => (
                            <tr>
                                <td className='py-1'>
                                    <p className='card-text fw-bold mb-25'>{item.name}</p>

                                </td>
                                <td className='py-1'>
                                    <span className='fw-bold'>{item.price}</span>
                                </td>
                                <td className='py-1'>
                                    <span className='fw-bold'>{item.cartQuantity}</span>
                                </td>
                                <td className='py-1'>
                                    <span className='fw-bold'>{parseFloat(item.price) * parseInt(item.cartQuantity)}</span>
                                </td>
                            </tr>
                        ))}


                        </tbody>
                    </Table>
                    {/* /Invoice Description */}

                    {/* Total & Sales Person */}
                    <CardBody className='invoice-padding pb-0'>
                        <Row className='invoice-sales-total-wrapper'>
                            <Col className='mt-md-0 mt-3' md='6' order={{md: 1, lg: 2}}>
                                <CardText className='mb-0'>
                                    <span className='fw-bold'>Salesperson:</span> <span className='ms-75'>DDS</span>
                                </CardText>
                            </Col>
                            <Col className='d-flex justify-content-end' md='6' order={{md: 2, lg: 1}}>
                                <div className='invoice-total-wrapper'>
                                    <div className='invoice-total-item'>
                                        <p className='invoice-total-title'>Subtotal:</p>
                                        <p className='invoice-total-amount'>{data.total}</p>
                                    </div>

                                    <hr className='my-50'/>
                                    <div className='invoice-total-item'>
                                        <p className='invoice-total-title'>Total:</p>
                                        <p className='invoice-total-amount'>{data.total}</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>

                    {/* /Total & Sales Person */}

                    <hr className='invoice-spacing'/>

                    {/* Invoice Note */}
                    <CardBody className='invoice-padding pt-0'>
                        <Row>
                            <Col sm='12'>
                                <span className='fw-bold'>Note: </span>
                                <span>
              It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
              projects. Thank You!
            </span>
                            </Col>
                        </Row>
                    </CardBody>
                    {/* /Invoice Note */}
                </Card>
            </div>
        </>
    ) : null
})

export default PreviewCard
