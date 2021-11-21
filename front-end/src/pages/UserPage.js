import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";


const UserPage = () => {

    const location = useLocation();
    const [data, setData] = useState([])
    const [recipe, setRecipe] = useState([]);
    // to make use of the token do data.token

    useEffect(() => {
        setData(location.state.data)
    }, [])

    const get_req = () => {

    }

    return (
        <React.Fragment>
            <h1> User Page </h1>
            <p> {String(data.token)} </p>
        </React.Fragment>
    )
}

export default UserPage;