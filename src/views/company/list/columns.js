// ** React Imports
import {Link} from 'react-router-dom'
import {Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap"
import {Archive, FileText, MoreVertical, Trash2} from "react-feather"
// ** Custom Components
const downloadLicense = (id) => {
// any kind of extension (.txt,.cpp,.cs,.bat)
//    convert id into blob
    const element = document.createElement("a")
    const file = new Blob([id], {
        type: "text/plain"
    })
    element.href = URL.createObjectURL(file)
    element.download = "license.lic"
    document.body.appendChild(element)
    element.click()
}
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
        name: 'Country',
        sortable: true,
        minWidth: '172px',
        sortField: 'role',
        selector: row => row.address.country,
        cell: row => <span className='text-capitalize'>{row.address.country}</span>
    },
    {
        name: 'Phone Number',
        minWidth: '138px',
        sortable: true,
        sortField: 'currentPlan',
        selector: row => row.phone,
        cell: row => <span className='text-capitalize'>{row.phone}</span>
    },
    {
        name: 'Max Sessions',
        minWidth: '230px',
        sortable: true,
        sortField: 'maxSessions',
        selector: row => row.maxSessions,
        cell: row => <span className='text-capitalize'>{row.maxSessions}</span>
    },
    {
        name: 'Postcode',
        minWidth: '230px',
        sortable: true,
        sortField: 'maxSessions',
        selector: row => row.address.postcode,
        cell: row => <span className='text-capitalize'>{row.address.postcode}</span>
    },
    {
        name: 'License',
        minWidth: '230px',
        sortable: true,
        sortField: 'maxSessions',
        selector: row => row.address.postcode,
        cell: row => (<Button color="primary" size="sm" onClick={() => {
            downloadLicense(row._id)
        }
        }> Download </Button>)
    },
    {
        name: 'Actions',
        minWidth: '100px',
        cell: row => (
            <div className='column-action'>
                <UncontrolledDropdown>
                    <DropdownToggle tag='div' className='btn btn-sm'>
                        <MoreVertical size={14} className='cursor-pointer'/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            tag={Link}
                            className='w-100'
                            to={`/apps/user/view/${row.id}`}
                            // onClick={() => store.dispatch(getUser(row.id))}
                        >
                            <FileText size={14} className='me-50'/>
                            <span className='align-middle'>Details</span>
                        </DropdownItem>
                        <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
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
