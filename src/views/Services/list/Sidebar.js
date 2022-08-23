// ** React Import
import {useState} from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import {selectThemeColors} from '@utils'
import {createANewOrder} from "@configs/helperCalls"
// ** Third Party Components
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import classnames from 'classnames'
import {useForm, Controller} from 'react-hook-form'
import {useNavigate} from "react-router-dom"
// ** Reactstrap Imports
import {Button, Label, Form, Input} from 'reactstrap'
import axios from "axios"
import {PUBLIC_API_URL} from "@src/config"
// ** Store & Actions
const defaultValues = {
    quantity: 1
}

const countryOptions = [
    {label: 'Australia', value: 'Australia'},
    {label: 'Bangladesh', value: 'Bangladesh'},
    {label: 'Belarus', value: 'Belarus'},
    {label: 'Brazil', value: 'Brazil'},
    {label: 'Canada', value: 'Canada'},
    {label: 'China', value: 'China'},
    {label: 'France', value: 'France'},
    {label: 'Germany', value: 'Germany'},
    {label: 'India', value: 'India'},
    {label: 'Indonesia', value: 'Indonesia'},
    {label: 'Israel', value: 'Israel'},
    {label: 'Italy', value: 'Italy'},
    {label: 'Japan', value: 'Japan'},
    {label: 'Korea', value: 'Korea'},
    {label: 'Mexico', value: 'Mexico'},
    {label: 'Philippines', value: 'Philippines'},
    {label: 'Russia', value: 'Russia'},
    {label: 'South', value: 'South'},
    {label: 'Thailand', value: 'Thailand'},
    {label: 'Turkey', value: 'Turkey'},
    {label: 'Ukraine', value: 'Ukraine'},
    {label: 'United Arab Emirates', value: 'United Arab Emirates'},
    {label: 'United Kingdom', value: 'United Kingdom'},
    {label: 'United States', value: 'United States'}
]

const checkIsValid = data => {
    return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({open, toggleSidebar}) => {
    // ** States
    const [data, setData] = useState(null)
    const navigate = useNavigate()
    // ** Store Vars

    // ** Vars
    const {
        control,
        setValue,
        setError,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues})
    const fetchOptionsCompany = async () => {
        const {data} = await axios.get(`${PUBLIC_API_URL}/api/company?select=name&limit=100000`)
        return await data.data.map(company => ({label: company.name, value: company._id}))
    }
    const fetchOptionsProducts = async () => {
        const {data} = await axios.get(`${PUBLIC_API_URL}/api/product?select=name&limit=100000`)
        return await data.data.map(product => ({label: product.name, value: product._id}))
    }
    // ** Function to handle form submit
    const onSubmit = async data => {
        setData(data)
        if (checkIsValid(data)) {
            await createANewOrder({
                orderItems: [
                    {

                        _id: data.product.value,
                        cartQuantity: parseInt(data.quantity)

                    }
                ],
                shippingAddress: {
                    address1: data.address1,
                    city: data.city,
                    postcode: data.postcode,
                    country: data.country.value
                },
                companyId: data.company.value
            }, toggleSidebar, navigate)


        } else {
            for (const key in data) {
                if (data[key] === null) {
                    setError('country', {
                        type: 'manual'
                    })
                }
                if (data[key] !== null && data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    const handleSidebarClosed = () => {
        for (const key in defaultValues) {
            setValue(key, '')
        }
    }

    return (
        <Sidebar
            size='lg'
            open={open}
            title='New User'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
            onClosed={handleSidebarClosed}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-1'>
                    <Label className='form-label' for='country'>
                        Company <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='company'
                        control={control}
                        render={({field}) => (
                            // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                            <AsyncSelect
                                loadOptions={fetchOptionsCompany}
                                defaultOptions={true}
                                theme={selectThemeColors}
                                className={classnames('react-select', {'is-invalid': data !== null && data.company === null})}
                                {...field}
                            />
                        )}
                    />
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='product'>
                        Product <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='product'
                        control={control}
                        render={({field}) => (
                            // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                            <AsyncSelect
                                loadOptions={fetchOptionsProducts}
                                defaultOptions={true}
                                theme={selectThemeColors}
                                className={classnames('react-select', {'is-invalid': data !== null && data.product === null})}
                                {...field}
                            />
                        )}
                    />
                </div>
                {/*website*/}
                <div className='mb-1'>
                    <Label className='form-label' for='quantity'>
                        Quantity <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='quantity'
                        control={control}
                        render={({field}) => (
                            <Input id='quantity' type={"number"} placeholder='1' invalid={errors.quantity && true} {...field} />
                        )}
                    />
                </div>

                <div className='mb-1'>
                    <Label className='form-label' for='address1'>
                        Address1 <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='address1'
                        control={control}
                        render={({field}) => (
                            <Input id='address1' placeholder='24 Example Street' invalid={errors.address1 && true} {...field} />
                        )}
                    />
                </div>

                {/*city*/}
                <div className='mb-1'>
                    <Label className='form-label' for='city'>
                        City <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='city'
                        control={control}
                        render={({field}) => (
                            <Input id='city' placeholder='Sydney' invalid={errors.city && true} {...field} />
                        )}
                    />
                </div>
                {/*postcode*/}
                <div className='mb-1'>
                    <Label className='form-label' for='postcode'>
                        Postcode <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='postcode'
                        control={control}
                        render={({field}) => (
                            <Input id='postcode' placeholder='2000' invalid={errors.postcode && true} {...field} />
                        )}
                    />
                </div>

                <div className='mb-1'>
                    <Label className='form-label' for='country'>
                        Country <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='country'
                        control={control}
                        render={({field}) => (
                            // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                            <Select
                                isClearable={false}
                                classNamePrefix='select'
                                options={countryOptions}
                                theme={selectThemeColors}
                                className={classnames('react-select', {'is-invalid': data !== null && data.country === null})}
                                {...field}
                            />
                        )}
                    />
                </div>

                <Button type='submit' className='me-1' color='primary'>
                    Add Service
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    )
}

export default SidebarNewUsers
