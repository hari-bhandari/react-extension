// ** React Imports
import {Link} from 'react-router-dom'
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap"
import {Archive, FileText, MoreVertical, Trash2} from "react-feather"
// ** Custom Components

export const columns = [
    {
        name: 'Company Name',
        sortable: true,
        minWidth: '300px',
        sortField: 'name',
        selector: row => row.name,
        cell: row => {
            return (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                            <span className='fw-bolder'>{row.name}</span>
                    </div>
                </div>
            )
        }
    },
    {
        name: 'Order ID',
        sortable: true,
        minWidth: '300px',
        sortField: 'name',
        selector: row => row._id,
        cell: row => {
            return (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/invoice/${row._id}`}
                            className='user_name text-truncate text-body'
                        >
                            <span className='fw-bolder'>{row._id}</span>
                        </Link>
                    </div>
                </div>
            )
        }
    },
    {
        name: 'Country',
        sortable: true,
        minWidth: '172px',
        sortField: 'role',
        selector: row => row.shippingAddress.country,
        cell: row => <span className='text-capitalize'>{row.shippingAddress.country}</span>
    },
    {
        name: 'Total Sale',
        minWidth: '138px',
        sortable: true,
        sortField: 'currentPlan',
        selector: row => row.total,
        cell: row => <span className='text-capitalize'>{row.total}</span>
    },
    {
        name: 'View Invoice',
        minWidth: '230px',
        sortable: true,
        sortField: 'maxSessions',
        selector: row => row.isPaid,
        cell:  row => {
            return (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='btn btn-success'>
                        <Link
                            to={`/invoice/${row._id}`}
                            className='user_name text-truncate text-body'
                        >
                            <span className='fw-bolder'>View Invoice</span>
                        </Link>
                    </div>
                </div>
            )
        }
    },
    {
        name: 'Postcode',
        minWidth: '230px',
        sortable: true,
        sortField: 'maxSessions',
        selector: row => row.shippingAddress.postcode,
        cell: row => <span className='text-capitalize'>{row.shippingAddress.postcode}</span>
    },
    {
        name: 'Actions',
        minWidth: '100px',
        cell: () => (
            <div className='column-action'>
                <UncontrolledDropdown>
                    <DropdownToggle tag='div' className='btn btn-sm'>
                        <MoreVertical size={14} className='cursor-pointer'/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            tag='a'
                            href='/'
                            className='w-100'
                            onClick={e => {
                                e.preventDefault()
                                // store.dispatch(deleteUser(row.id))
                            }}
                        >
                            <Trash2 size={14} className='me-50'/>
                            <span className='align-middle'>Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        )
    }
]
