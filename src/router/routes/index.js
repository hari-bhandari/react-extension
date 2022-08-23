// ** React Imports
import {Fragment, lazy} from "react"
import {Navigate} from "react-router-dom"
// ** Layouts
import BlankLayout from "@layouts/BlankLayout"
import VerticalLayout from "@src/layouts/VerticalLayout"
import HorizontalLayout from "@src/layouts/HorizontalLayout"
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper"

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute"
import PrivateRoute from "@components/routes/PrivateRoute"
// ** Utils
import {isObjEmpty} from "@utils"
import InvoicePreview from "@src/views/invoice/preview"

const getLayout = {
    blank: <BlankLayout/>,
    vertical: <VerticalLayout/>,
    horizontal: <HorizontalLayout/>
}

// ** Document title
const TemplateTitle = "%s - DDS"

// ** Default Route
const DefaultRoute = "/login"

const Home = lazy(() => import("../../views/Home"))
const SecondPage = lazy(() => import("../../views/SecondPage"))
const Login = lazy(() => import("../../views/Login"))
const Error = lazy(() => import("../../views/Error"))
const CustomerRoute = lazy(() => import("../../views/company/list"))
const CustomerGroup = lazy(() => import("../../views/customers-group"))
const Services = lazy(() => import("../../views/Services/list"))
const Products = lazy(() => import("../../views/Products/list"))
const Calendar = lazy(() => import("../../views/Calender"))
// ** Merge Routes
const Routes = [
    {
        path: "/",
        index: true,
        element: <Navigate replace to={DefaultRoute}/>
    },
    {
        path: "/home",
        element: <Home/>,
        private: true
    },
    {
        path: "/customers",
        element: <CustomerRoute/>,
        private: true

    },
    {
        path: "/second-page",
        element: <SecondPage/>,
        private: true
    },
    {
        path: "/login",
        element: <Login/>,
        meta: {
            layout: "blank"
        },
        private: false
    },
    {
        path: '/customers-group',
        element: <CustomerGroup/>,
        private: true
    },
    {
        path: '/services',
        element: <Services/>,
        private: true
    },
    {
        path: '/calendar',
        element: <Calendar/>,
        private: true
    },
    {
        path: '/products',
        element: <Products/>,
        private: true
    },
    {
        path: '/invoice/:id',
        element: <InvoicePreview/>,
        private: true
    },
    {
        path: "/error",
        element: <Error/>,
        meta: {
            layout: "blank"
        },
        private: false
    }
]

const getRouteMeta = (route) => {
    if (isObjEmpty(route.element.props)) {
        if (route.meta) {
            return {routeMeta: route.meta}
        } else {
            return {}
        }
    }
}

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
    const LayoutRoutes = []

    if (Routes) {

        Routes.filter((route) => {
            let isBlank = false
            // ** Checks if Route layout or Default layout matches current layout
            if (
                (route.meta && route.meta.layout && route.meta.layout === layout) ||
                ((route.meta === undefined || route.meta.layout === undefined) &&
                    defaultLayout === layout)
            ) {
                const RouteTag = route.private ? PrivateRoute : PublicRoute

                // ** Check for public or private route
                if (route.meta) {
                    route.meta.layout === "blank" ? (isBlank = false) : (isBlank = false)
                }
                if (route.element) {
                    const Wrapper =
                        // eslint-disable-next-line multiline-ternary
                        isObjEmpty(route.element.props) && isBlank === false
                            ? // eslint-disable-next-line multiline-ternary
                            LayoutWrapper
                            : Fragment

                    route.element = (
                        <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
                            <RouteTag route={route}>{route.element}</RouteTag>
                        </Wrapper>
                    )
                }

                // Push route to LayoutRoutes
                LayoutRoutes.push(route)
            }
            return LayoutRoutes
        })
    }
    return LayoutRoutes
}

const getRoutes = (layout) => {
    const defaultLayout = layout || "vertical"
    const layouts = ["vertical", "horizontal", "blank"]

    const AllRoutes = []

    layouts.forEach((layoutItem) => {
        const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout)
        AllRoutes.push({
            path: "/",
            element: getLayout[layoutItem] || getLayout[defaultLayout],
            children: LayoutRoutes
        })
    })
    return AllRoutes
}

export {DefaultRoute, TemplateTitle, Routes, getRoutes}
