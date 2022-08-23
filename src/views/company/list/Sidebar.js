// ** React Import
import {useState} from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import {selectThemeColors} from '@utils'
import {createCompany} from "@configs/helperCalls"
// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import {useForm, Controller} from 'react-hook-form'

// ** Reactstrap Imports
import {Button, Label, FormText, Form, Input} from 'reactstrap'
// ** Store & Actions
const defaultValues = {
    email: '',
    name: '',
    website: '',
    phone: '',
    address1: '',
    city: '',
    postcode: '',
    country: null
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

    // ** Store Vars

    // ** Vars
    const {
        control,
        setValue,
        setError,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues})

    // ** Function to handle form submit
    const onSubmit = async data => {
        setData(data)
        if (checkIsValid(data)) {
            await createCompany({
                name: data.name,
                email: data.email,
                website: data.website,
                phone: data.phone,
                address:{
                    address1: data.address1,
                    city: data.city,
                    postcode: data.postcode,
                    country: data.country.value
                }
            }, toggleSidebar)


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
            title='New Company'
            headerClassName='mb-1'
            contentClassName='pt-0'
            toggleSidebar={toggleSidebar}
            onClosed={handleSidebarClosed}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-1'>
                    <Label className='form-label' for='name'>
                        Company Name <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='name'
                        control={control}
                        render={({field}) => (
                            <Input id='name' placeholder='Company Name' invalid={errors.name && true} {...field} />
                        )}
                    />
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='phone'>
                        Phone Number <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='phone'
                        control={control}
                        render={({field}) => (
                            <Input id='phone' placeholder='0755837473' invalid={errors.phone && true} {...field} />
                        )}
                    />
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='userEmail'>
                        Email <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='email'
                        control={control}
                        render={({field}) => (
                            <Input
                                type='email'
                                id='email'
                                placeholder='company@example.com'
                                invalid={errors.email && true}
                                {...field}
                            />
                        )}
                    />
                    <FormText color='muted'>You can use letters, numbers & periods</FormText>
                </div>

                <div className='mb-1'>
                    <Label className='form-label' for='address'>
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
                {/*website*/}
                <div className='mb-1'>
                    <Label className='form-label' for='website'>
                        Website
                    </Label>
                    <Controller
                        name='website'
                        control={control}
                        render={({field}) => (
                            <Input id='website' placeholder='www.example.com' invalid={errors.website && true} {...field} />
                        )}
                    />
                </div>
                <Button type='submit' className='me-1' color='primary'>
                    Add Company
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>
    )
}

export default SidebarNewUsers
