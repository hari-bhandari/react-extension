import {useSkin} from "@hooks/useSkin"
import InputPasswordToggle from "@components/input-password-toggle"
import toast from 'react-hot-toast'
import {useNavigate} from "react-router-dom"
import {
    Row,
    Col,
    CardTitle,
    CardText,
    Form,
    Label,
    Input,
    Button
} from "reactstrap"
import "@styles/react/pages/page-authentication.scss"
import {handleLogin} from "@store/authentication"
import {useDispatch} from "react-redux"
import axios from "axios"
import {PUBLIC_API_URL} from "@src/config"

const Login = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            e.preventDefault()

            const data = {
                email: e.target.email.value,
                password: e.target.password.value
            }
            const response = await axios.post(`${PUBLIC_API_URL}/api/auth/login`, data)
            // if response status is 200, redirect to /home
            if (response.status === 200) {
                dispatch(handleLogin(response.data))
                if (e.target.remember.checked) {
                    localStorage.setItem("token", response.data.token)
                }
                navigate("/home")
                toast.success("Login Successful")
            }

        } catch (e) {
            toast.error("Login Failed,Please try again")
        }
    }
    const {skin} = useSkin()

    const illustration = skin === "dark" ? "login-v2-dark.svg" : "login-v2.svg",
        source = require(`@src/assets/images/pages/${illustration}`).default

    return (
        <div className="auth-wrapper auth-cover">
            <Row className="auth-inner m-0">

                <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
                    <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                        <img className="img-fluid" src={source} alt="Login Cover"/>
                    </div>
                </Col>
                <Col
                    className="d-flex align-items-center auth-bg px-2 p-lg-5"
                    lg="4"
                    sm="12"
                >
                    <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
                        <CardTitle tag="h2" className="fw-bold mb-1">
                            Welcome to Dashing Distribution! 👋
                        </CardTitle>
                        <CardText className="mb-2">
                            Please sign-in to your account
                        </CardText>
                        <Form
                            className="auth-login-form mt-2"
                            onSubmit={onSubmit}
                        >
                            <div className="mb-1">
                                <Label className="form-label" for="login-email">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    id="login-email"
                                    name="email"
                                    placeholder="john@example.com"
                                    autoFocus
                                />
                            </div>
                            <div className="mb-1">
                                <div className="d-flex justify-content-between">
                                    <Label className="form-label" for="login-password">
                                        Password
                                    </Label>
                                </div>
                                <InputPasswordToggle
                                    className="input-group-merge"
                                    id="login-password"
                                    name="password"
                                />
                            </div>
                            <div className="form-check mb-1">
                                <Input type="checkbox" id="remember-me" name={'remember'}/>
                                <Label className="form-check-label" for="remember-me">
                                    Remember Me
                                </Label>
                            </div>
                            <Button type="submit" color="primary" block>Submit
                            </Button>
                        </Form>

                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default Login
