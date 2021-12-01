import React, { useState, useEffect } from "react";
import {useLocation, useParams } from "react-router";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const URL = 'https://jakobandjonny.a2hosted.com/COMP4537/TermProject/api/v1'

const UpdateUserPage = () => {
    const location = useLocation();
    console.log(location.state.dt)
    const [dt, setDt] = useState([])
    const [oldpass, setOldPass] = useState('')
    const [newpass, setNewpass] = useState('')
    const [reconpass, setReconpass] = useState('')
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        console.log(newpass);
    }, [newpass])
    useEffect(() => {
        console.log(reconpass);
    }, [reconpass])

    useEffect(() => {
        console.log(oldpass);
    }, [oldpass])
    useEffect(()=> {
        setDt(location.state.dt)
    },[])

    const changepw = () => {
        if (newpass.length < 1 && newpass !== reconpass) {
            alert("Passwords do not match")
        } else {
            const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${location.state.dt.token}`}
            console.log(headers)
            const password = {"password": newpass}
            axios.put(`${URL}/users/${id}`, password, {headers}).then((response)=> {
                console.log("This is the response", response)   
                alert("Password Changed")

            }).catch((err) => {
                console.log(err)
                console.log("Password NOT changed!")
            });
        }
    }

    const back_button = () => {
        navigate(`/user/${dt.Id}`, 
        {
            state: {data: dt}
        })
    }

    return (
        <React.Fragment>
            <h1>Update User</h1>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=> setOldPass(e.target.value)}>
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control type="password" placeholder="Old Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=> setNewpass(e.target.value)}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=> setReconpass(e.target.value)}>
                    <Form.Label>Re-Type Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" />
                </Form.Group>
                <Button variant="primary" type="button" onClick= {() => changepw()}>
                    Submit
                </Button>
            </Form>
            <Button variant="primary" type="button" onClick={()=> back_button()}>
                    Back Button
                </Button>
        </React.Fragment>
    )
}

export default UpdateUserPage;