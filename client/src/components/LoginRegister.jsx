import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import {
    MDBInput,
    MDBBtn,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBContainer
} from 'mdb-react-ui-kit';

const LoginRegister = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [register, setRegister] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const [danger, setDanger] = useState({})
    const [dangerLogin, setDangerLogin] = useState({})

    const navigate = useNavigate()

    const [loginRegisterActive, setLoginRegisterActive] = useState('Login');
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Control de MDBTabs
    const handleLoginRegisterClick = (value) => {
        if (value === loginRegisterActive) {
            return;
        }
        setLoginRegisterActive(value);
    };

    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Submit del Formulario Login
    const submitLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', {
            email, password
        }, {withCredentials:true, credentials:'include'})
        .then((res)=>{
            console.log(res)
            navigate('/students')
        }).catch((err)=>{
            console.log(err)
        })
    }
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    // Submit del Formulario Registrar

    const submitRegister = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/registration',register)
            .then((res) => {
                console.log(" Registro =>", res.data.successMessage);
                handleLoginRegisterClick('Login')
            }).catch((err) => {
                console.log(err)
                setDanger(err.response.data.error.errors)
            })
    }

    const handleChange = (e) => {
        setRegister(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

    }

    return (
        <MDBContainer breakpoint="md h-50 w-50">
            <MDBTabs pills justify className='mb-3'>
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleLoginRegisterClick('Login')}
                        active={loginRegisterActive === 'Login'}
                    >
                        Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink
                        onClick={() => handleLoginRegisterClick('Register')}
                        active={loginRegisterActive === 'Register'}
                    >
                        Registrar
                    </MDBTabsLink>
                </MDBTabsItem>
            </MDBTabs>

            <MDBContainer breakpoint="md h-50 w-50 align-items-center">
                <MDBTabsContent className='mb-3'>
                    <MDBTabsPane
                        show={loginRegisterActive === 'Login'}
                    >
                        <form>
                            <div className='text-center mb-3'>
                                <p>Iniciar sesión:</p>
                            </div>

                            <MDBInput className='mb-4' type='email' label='Email address' onChange={(e) => setEmail(e.target.value)} />
                            <MDBInput className='mb-4' type='password' id='form7Example2' label='Password' onChange={(e) => setPassword(e.target.value)} />
                                {dangerLogin.error ? <span className='text-danger'>{dangerLogin.error }</span> : null}

                            <MDBBtn type='submit' className='mb-4' block
                                    onClick={submitLogin}>
                                Sign in
                            </MDBBtn>
                        </form>
                    </MDBTabsPane>
                    <MDBTabsPane
                        show={loginRegisterActive === 'Register'}
                    >
                        <form>
                            <div className='text-center mb-3'>
                                <p>Crear Cuenta:</p>
                            </div>

                            <MDBInput className='mb-4' id='form8Example1' label='Nombre' onChange={handleChange} name="firstName" />
                                {danger.firstName ? <span className='text-danger'>{danger.firstName.message}</span> : null}
                            <MDBInput className='mb-4' id='form8Example2' label='Apellido' onChange={handleChange} name="lastName" />
                                {danger.lastName ? <span className='text-danger'>{danger.lastName.message}</span> : null}
                            <MDBInput className='mb-4' type='email' id='form8Example3' label='Dirección de correo electrónico' onChange={handleChange} name="email" />
                                {danger.email ? <span className='text-danger'>{danger.email.message}</span> : null}
                            <MDBInput className='mb-4' type='password' id='form8Example4' label='Password' onChange={handleChange} name="password" />
                                {danger.password ? <span className='text-danger'>{danger.password.message}</span> : null}
                            {/* <MDBInput className='mb-4' type='password' id='form8Example5' label='Repeat password' onChange={handleChange} name="lastName"/> */}

                            <MDBBtn type='submit' className='mb-4' block
                                onClick={submitRegister}>
                                Sign in
                            </MDBBtn>
                        </form>
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBContainer>
        </MDBContainer>
    )
}

export default LoginRegister
