import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const RegisterComponent = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('')
    const URL = 'https://jakobandjonny.a2hosted.com/COMP4537/TermProject/api/v1'

    const navigate = useNavigate()

    const createUser = () => {

        axios.post(`${URL}/register`, {
            "email": email,
            "password": password
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                }
            }).then((response) => {
                console.log(response.data)
                if (response.data.success === false) {
                    alert(response.data.message)
                }
                else {
                    redirect_to_login()
                }
               
            }).catch((error) => {
                console.log(error)
        })
    }

    const redirect_to_login = () => {
        navigate('/login')
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail"  onChange={(e) => setemail(e.target.value)}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setpassword(e.target.value)}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="button" onClick={()=> createUser()}>
                Submit
            </Button>
        </Form>
    )
}

export default RegisterComponent;