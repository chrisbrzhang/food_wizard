import React, { useState } from "react";
import {Form, Button} from "react-bootstrap";
import axios from "axios";

const AdminPage = () => {
    const [token, setToken] = useState('');
    const [data, setData] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function checkAdmin() {
        axios.post('http://localhost:8888/login', {
            "email": email,
            "password": password
          },
          {
              headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
              }
          }).then((response) => {
              if (response.data.success == false) {
                  alert(response.data.message)
              }
              else {
                setData(response.data);
                localStorage.setItem("token", data.token);
              }
          }).catch((error)=> {
              console.log(error)
          })
    }

    // get number of requests for post/id and get/id, see recipes.js
    function getAllRequests() {
        axios.get('https://jakobandjonny.a2hosted.com/COMP4537/back-end/recipes/requests', 
        {
            headers: {
                "Authorization": "Bearer " + data.token,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        .then(function (response) {
            document.getElementById("recipeGetId").innerHTML = response.data["get"];
            document.getElementById("recipePostId").innerHTML = response.data["post"];
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    if (data.Email == "admin@gmail.com") {
        window.onload = getAllRequests();
        return (
            <React.Fragment>
                <h1> Admin Page </h1>
                
                <table>
                    <tr>
                        <th>Method</th>
                        <th>Endpoint</th>
                        <th>Requests</th>
                    </tr>
                    <tr>
                        <td>GET</td>
                        <td>/recipes/id</td>
                        <td id="recipeGetId"></td>
                    </tr>
                    <tr>
                        <td>POST</td>
                        <td>/recipes/id</td>
                        <td id="recipePostId"></td>
                    </tr>
                </table>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <h1>Admin Page</h1>
                <p>Please enter admin credentials to access this page.</p>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e)=> setEmail(e.target.value)}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=> setPassword(e.target.value)}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick= {() => checkAdmin()}>
                        Submit
                    </Button>
                </Form>
            </React.Fragment>
        );
    }

}


export default AdminPage;