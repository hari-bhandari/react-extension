// ** React Imports
import {Link} from 'react-router-dom'
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap"
import {Archive, FileText, MoreVertical, Trash2} from "react-feather"
// ** Custom Components

export const columns = [
    {
        name: 'Product Image',
        sortable: true,
        minWidth: '300px',
        selector: row => row.thumbImage,
        cell: row => {
            return (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/apps/user/view/${row._id}`}
                            className='user_name text-truncate text-body'
                        >
                            <img style={{height:"40px"}} src={row.thumbImage === 'defaultThumbImage.png' ? 'https://dashingdisty.com/wp-content/uploads/2022/02/Background-1.png' : row.thumbImage} alt='user' className='img-fluid'/>
                        </Link>
                    </div>
                </div>
            )
        }
    },
    {
        name: 'Product Name',
        sortable: true,
        minWidth: '300px',
        sortField: 'name',
        selector: row => row.name,
        cell: row => {
            return (
                <div className='d-flex justify-content-left align-items-center'>
                    <div className='d-flex flex-column'>
                        <Link
                            to={`/apps/user/view/${row._id}`}
                            className='user_name text-truncate text-body'
                        >
                            <span className='fw-bolder'>{row.name}</span>
                        </Link>
                        <small className='text-truncate text-muted mb-0'>{row.email}</small>
                    </div>
                </div>
            )
        }
    },
    {
        name: 'Description',
        sortable: true,
        minWidth: '172px',
        sortField: 'description',
        selector: row => row.description,
        cell: row => <span className='text-capitalize'>{row.description}</span>
    },
    {
        name: 'Valid For',
        minWidth: '138px',
        sortable: true,
        sortField: 'activeDurationInDays',
        selector: row => row.activeDurationInDays,
        cell: row => <span className='text-capitalize'>{row.activeDurationInDays}</span>
    },
    {
        name: 'Price',
        minWidth: '230px',
        sortable: true,
        sortField: 'price',
        selector: row => row.price,
        cell: row => <span className='text-capitalize'>{row.price}</span>
    },

    {
        name: 'Actions',
        minWidth: '100px',
        cell: (row) => (
            <div className='column-action'>
                <UncontrolledDropdown>
                    <DropdownToggle tag='div' className='btn btn-sm'>
                        <MoreVertical size={14} className='cursor-pointer'/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem tag='a' href={`/${row._id}`} className='w-100' onClick={e => e.preventDefault()}>
                            <Archive size={14} className='me-50'/>
                            <span className='align-middle'>Edit</span>
                        </DropdownItem>
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
