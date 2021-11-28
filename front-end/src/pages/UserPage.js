import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { FormControl, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const UserPage = () => {

    const location = useLocation();
    const [data, setData] = useState([])
    const [recipe, setRecipe] = useState([]);
    // to make use of the token do data.token
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setData(location.state.data)
    }, [])

    const changePw = () => {
 
        navigate(`/user/${data.Id}/update`, 
        {
            state: {tkn: data.token, email: data.Email}
        })
        console.log("hello world");
    
    }

    return (
        <React.Fragment>
            <h1> Welcome {data.Email} </h1>
            <p> {String(data.token)} </p>
            <p> this is the id: {id} </p>
            <Form>
                <Button variant="primary" type="button" onClick= {() => changePw()}>
                    Change Password
                </Button>
            </Form>

        </React.Fragment>
    )
}

export default UserPage;