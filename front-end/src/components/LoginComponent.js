import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {Form, Button} from "react-bootstrap";


const LoginComponent = () => {
    const URL = 'https://jakobandjonny.a2hosted.com/COMP4537/TermProject/api/v1'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (data.length !== 0) {
            if (data.Email === "admin@gmail.com") {
                redirectAdminPage()
            } else {
                redirectUserPage()
            }
        }
    }, [data])

    const loginUser = () => {
        console.log("Login User")
        axios.post(`${URL}/login`, {
        "email": email,
        "password": password
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }).then((response) => {
            if (response.data.success === false) {
                alert(response.data.message)
            }
            else {
                setData(response.data);
                localStorage.setItem("token", response.data.token);
            }
        }).catch((error)=> {
            console.log(error)
        })
    }

    const redirectUserPage = () => {
        navigate(`/user/${data.Id}`, 
        {
            state: {data: data}
        })
    }

    const redirectAdminPage = () => {
        navigate(`/admin`, 
        {
            state: {data: data}
        })
    }


    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=> setEmail(e.target.value)}>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=> setPassword(e.target.value)}>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="button" onClick= {() => loginUser()}>
                Submit
            </Button>
        </Form>
    )
}

export default LoginComponent;