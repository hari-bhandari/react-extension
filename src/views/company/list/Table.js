// ** React Imports
import {Fragment, useState} from 'react'

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Table Columns
import {columns} from './columns'

// ** Store & Actions

// ** Third Party Components
import Select from 'react-select'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import {ChevronDown, Share, Printer, File, Grid, Copy, FileText} from 'react-feather'

// ** Utils
import {selectThemeColors} from '@utils'

// ** Reactstrap Imports
import {
    Row, Col, Card, Input, Label, Button, CardBody,

    DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import useAxios from "axios-hooks"
import {PUBLIC_API_URL} from "@src/config"
import {useDebounce} from "use-debounce"

// ** Table Header
const CustomHeader = ({store, toggleSidebar, handlePerPage, rowsPerPage, handleFilter, searchTerm}) => {
    // ** Converts table to CSV
    function convertArrayOfObjectsToCSV(array) {
        let result

        const columnDelimiter = ','
        const lineDelimiter = '\n'
        const keys = Object.keys(store[0])

        result = ''
        result += keys.join(columnDelimiter)
        result += lineDelimiter

        array.forEach(item => {
            let ctr = 0
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter

                result += item[key]

                ctr++
            })
            result += lineDelimiter
        })

        return result
    }

    // ** Downloads CSV
    function downloadCSV(array) {
        const link = document.createElement('a')
        let csv = convertArrayOfObjectsToCSV(array)
        if (csv === null) return

        const filename = 'export.csv'

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`
        }

        link.setAttribute('href', encodeURI(csv))
        link.setAttribute('download', filename)
        link.click()
    }

    return (<div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <label htmlFor='rows-per-page'>Show</label>
                        <Input
                            className='mx-50'
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{width: '5rem'}}
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </Input>
                        <label htmlFor='rows-per-page'>Entries</label>
                    </div>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                        <label className='mb-0' htmlFor='search-invoice'>
                            Search:
                        </label>
                        <Input
                            id='search-invoice'
                            className='ms-50 w-100'
                            type='text'
                            value={searchTerm}
                            onChange={e => handleFilter(e.target.value)}
                        />
                    </div>

                    <div className='d-flex align-items-center table-header-actions'>
                        <UncontrolledDropdown className='me-1'>
                            <DropdownToggle color='secondary' caret outline>
                                <Share className='font-small-4 me-50'/>
                                <span className='align-middle'>Export</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100' onClick={() => downloadCSV(store)}>
                                    <FileText className='font-small-4 me-50'/>
                                    <span className='align-middle'>CSV</span>
                                </DropdownItem>
                                <DropdownItem className='w-100' onClick={() => downloadCSV(store)}>
                                    <Grid className='font-small-4 me-50'/>
                                    <span className='align-middle'>Excel</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                        <Button className='add-new-user' color='primary' onClick={toggleSidebar}>
                            Add New Company
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>)
}

const UsersList = () => {

    // ** States
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [currentStatus, setCurrentStatus] = useState({value: '', label: 'Select Status', number: 0})
    const [search] = useDebounce(searchTerm, 500)
    // ** Function to toggle sidebar

    const [{data, loading}] = useAxios(`${PUBLIC_API_URL}/api/company?page=${currentPage}&limit=${rowsPerPage}&search=${search}`)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
    if (loading) return <div>Loading...</div>
    const statusOptions = [{value: '', label: 'Select Status', number: 0}, {value: 'active', label: 'Active', number: 1}, {value: 'inactive', label: 'Inactive', number: 2}]

    // ** Function in get data on page change
    const handlePagination = page => {
        console.log(page)
        setCurrentPage(page.selected + 1)
    }

    // ** Function in get data on rows per page
    const handlePerPage = e => {
        const value = parseInt(e.currentTarget.value)
        setRowsPerPage(value)
    }

    // ** Function in get data on search query change
    const handleFilter = val => {
        setSearchTerm(val)
        // dispatch(
        //   getData({
        //     sort,
        //     q: val,
        //     sortColumn,
        //     page: currentPage,
        //     perPage: rowsPerPage,
        //     role: currentRole.value,
        //     status: currentStatus.value,
        //     currentPlan: currentPlan.value
        //   })
        // )
    }
    // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number(data.total / rowsPerPage)

        return (<ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
            />)
    }

    // ** Table data to render
    const dataToRender = () => {
        const Data = data.data
        const filters = {
            status: currentStatus.value, q: searchTerm
        }

        const isFiltered = Object.keys(filters).some(function (k) {
            return filters[k].length > 0
        })
        if (Data.length > 0) {
            return Data
        } else if (!loading && Data.length === 0 && isFiltered) {
            return []
        } else {
            return Data.slice(0, rowsPerPage)
        }
    }


    return (<Fragment>
            <Card>
                <CardBody>
                    <Row>

                        <Col md='12'>
                            <Label for='status-select'>Status</Label>
                            <Select
                                theme={selectThemeColors}
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={statusOptions}
                                value={currentStatus}
                                onChange={data => {
                                    setCurrentStatus(data)

                                }}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTable
                        noHeader
                        subHeader
                        sortServer
                        pagination
                        responsive
                        paginationServer
                        columns={columns}
                        sortIcon={<ChevronDown/>}
                        className='react-dataTable'
                        paginationComponent={CustomPagination}
                        data={dataToRender()}

                        subHeaderComponent={<CustomHeader
                            store={data.data}
                            searchTerm={searchTerm}
                            rowsPerPage={rowsPerPage}
                            handleFilter={handleFilter}
                            handlePerPage={handlePerPage}
                            toggleSidebar={toggleSidebar}
                        />}
                    />
                </div>
            </Card>

            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar}/>
        </Fragment>)
}

export default UsersList
