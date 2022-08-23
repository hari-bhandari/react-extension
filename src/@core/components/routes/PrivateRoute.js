// ** React Imports
import {Navigate} from "react-router-dom"
import {Suspense} from "react"

// ** Context Imports
import {useSelector} from "react-redux"

const PrivateRoute = ({children, route}) => {
    // ** Hooks & Vars
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated)
    const user = useSelector(state => state.authentication.user)


    if (route) {
        if (!isAuthenticated || user?.role !== "admin") {
            return <Navigate to="/login"/>
        }
    }

    return <Suspense fallback={null}>{children}</Suspense>
}

export default PrivateRoute
