import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import axios from "axios";

const AdminPage = () => {
    const [token, setToken] = useState('');

    const location = useLocation();
    useEffect (() => {
        setToken(location.state.data.token)
    }, [])

   
   


    return (
        <React.Fragment>
            <h1> Admin Page </h1>
            

        </React.Fragment>
    )
}


export default AdminPage;