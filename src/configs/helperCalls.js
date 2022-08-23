import axios from "axios"
import toast from "react-hot-toast"
import {PUBLIC_API_URL} from "@src/config"

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}
export const createCompany = async (company, toggleSidebar) => {
    try {
        const response = await axios.post(`${PUBLIC_API_URL}/api/company`, company, config)
        toggleSidebar()
        toast.success("Created new company successfully")
        return response.data
    } catch (error) {
        toast.error("Error creating company")
    }
}
export const createProduct = async (product, toggleSidebar, refetch) => {
    try {
        const response = await axios.post(`${PUBLIC_API_URL}/api/product`, product, config)
        toggleSidebar()
        refetch()
        toast.success("Created new Product")
        return response.data
    } catch (error) {
        toast.error("Error creating company")
    }
}
export const createANewOrder = async (company, toggleSidebar, navigate) => {
    try {
        const response = await axios.post(`${PUBLIC_API_URL}/api/order`, company, config)
        console.log(response.data)
        toggleSidebar()
        toast.success("Created new License successfully")
        navigate(`/invoice/${response.data.createdOrder._id}`)
        return response.data
    } catch (error) {
        toast.error("Error creating service")
    }
}