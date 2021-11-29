import React, { useState, useEffect } from "react";
import {useLocation, useParams } from "react-router";
import axios from "axios";
import { FormControl, Form, Button, Alert } from "react-bootstrap";

const UpdateUserPage = () => {
    const location = useLocation();
    const [newpass, setNewpass] = useState('')
    const [reconpass, setReconpass] = useState('')
    const [oldpass, setOldpass] = useState('')
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const {id} = useParams();

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
        setEmail(location.state.email);
        console.log(email)
    },[])

    useEffect(() => {
        console.log(token)
        changepw();
    },[token])


    const changepw = () => {
        if (newpass.length < 1 && newpass != reconpass) {
            alert("Passwords do not match")
        } else {
            const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
            console.log(headers)
            const password = {"Password": newpass}
            axios.put(`https://jakobandjonny.a2hosted.com/COMP4537/TermProject/api/v1/users/${id}`, password, {headers}).then((response)=> {
                console.log("This is the response", response)   

            }).catch((err) => {
                console.log(err)
                console.log("Password NOT changed!")
            });
        }
    }
    const confirmOldpass = () => {
        axios.post('https://jakobandjonny.a2hosted.com/COMP4537/TermProject/api/v1/login', {
            "email": email,
            "password": oldpass
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
              }
          }).then((response) => {
              if (response.data.success == false) {
                  alert("old password doesnt not match")
              }
              else {
                  alert("Password changed")
                  setToken(response.data.token)
              }
        }).catch((error) => {
            console.log(error)
            })
        };

    return (
        <React.Fragment>
            <h1>Update User</h1>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=> setOldpass(e.target.value)}>
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
                <Button variant="primary" type="button" onClick= {() => confirmOldpass()}>
                    Submit
                </Button>
            </Form>
        </React.Fragment>
    )
}

export default UpdateUserPage;