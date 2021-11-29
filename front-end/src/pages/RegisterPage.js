import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const RegisterPage = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('')

    const navigate = useNavigate()

    const createUser = () => {

        axios.post('https://jakobandjonny.a2hosted.com/COMP4537/TermProject/api/v1/register', {
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
        <React.Fragment>
            <h1> Register Page </h1>
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
            {/* <form>
                <textarea onChange={(e) => setemail(e.target.value)}></textarea>
                <textarea onChange={(e) => setpassword(e.target.value)}></textarea>
                <button type="button" onClick={() => createUser()}> SUBMIT </button>
            </form> */}
        </React.Fragment>
    )

}

export default RegisterPage;