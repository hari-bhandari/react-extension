// ** React Import
import {useState} from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { createProduct} from "@configs/helperCalls"
// ** Third Party Components
import {useForm, Controller} from 'react-hook-form'

// ** Reactstrap Imports
import {Button, Label, FormText, Form, Input} from 'reactstrap'
// ** Store & Actions
const defaultValues = {
    name: '', description: '', activeDurationInDays: '', price: '', id: ''
}


const checkIsValid = data => {
    return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({open, toggleSidebar, refetch}) => {
    // ** States
    const [data, setData] = useState(null)
    console.log(data)
    // ** Store Vars

    // ** Vars
    const {
        control, setValue, setError, handleSubmit, formState: {errors}
    } = useForm({defaultValues})

    // ** Function to handle form submit
    const onSubmit = async data => {
        setData(data)
        if (checkIsValid(data)) {
            await createProduct({
                name: data.name, description: data.description, activeDurationInDays: data.activeDurationInDays, price: data.price, id: data.id

            }, toggleSidebar, refetch)


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

    return (<Sidebar
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
                    <Label className='form-label' for='address'>
                        Name <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='name'
                        control={control}
                        render={({field}) => (<Input id='name' placeholder='Product name...' invalid={errors.name && true} {...field} />)}
                    />
                </div>

                {/*city*/}
                <div className='mb-1'>
                    <Label className='form-label' for='description'>
                        Description <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='description'
                        control={control}
                        render={({field}) => (<Input type={"textarea"} placeholder='Product Description ...' invalid={errors.city && true} {...field} />)}
                    />
                </div>
                <div className='mb-1'>
                    <Label className='form-label' for='price'>
                        Price Per Quantity <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='price'
                        control={control}
                        render={({field}) => (<Input id='price' type={'number'} placeholder='2000' invalid={errors.price && true} {...field} />)}
                    />
                </div>
                {/*active duration*/}
                <div className='mb-1'>
                    <Label className='form-label' for='activeDurationInDays'>
                        Product Active Duration (In Days) <span className='text-danger'>*</span>
                    </Label>
                    <Controller
                        name='activeDurationInDays'
                        control={control}
                        render={({field}) => (<Input id='activeDurationInDays' type={'number'} placeholder='2000' invalid={errors.activeDurationInDays && true} {...field} />)}
                    />
                </div>


                {/*ID*/}
                <div className='mb-1'>
                    <Label className='form-label' for='id'>
                        Product ID
                    </Label>
                    <Controller
                        name='id'
                        control={control}
                        render={({field}) => (<Input id='id' placeholder='product-id' invalid={errors.id && true} {...field} />)}
                    />
                </div>
                <Button type='submit' className='me-1' color='primary'>
                    Add Product
                </Button>
                <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
                    Cancel
                </Button>
            </Form>
        </Sidebar>)
}

export default SidebarNewUsers
