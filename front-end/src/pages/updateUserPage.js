import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import axios from "axios";

const updateUserPage = () => {
    const [pass, setPass] = useState('');
    const [token, setToken] = useState('');
    const [id, setId] = useState('');


    const changepw = (pass) => {
        let headers = {'Content-Type': 'application/json', 'Authorization': 'Bearer '+token, 'data': pass}
        axios.put('localhost:8888/users/', pass).then((response)=> {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        });
    }
    const 


    return (
        <React.Fragment>
            <h1>Update User</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=> setPass(e.target.value)}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="button" onClick= {() => changePw()}>
                    Submit
                </Button>
            </Form>
            

        </React.Fragment>
    )
}

export default updateUserPage;