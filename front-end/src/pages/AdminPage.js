import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import axios from "axios";

const AdminPage = () => {
    const [token, setToken] = useState('');

    const location = useLocation();
    useEffect (() => {
        setToken(location.state.data.token)
    }, [])

    // get number of requests for post/id and get/id, see recipes.js
   function getAllRequests() {
        axios.get('http://localhost:8888/recipes/requests', 
        {
            headers: {
                "Authorization": "Bearer " + token,
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
}


export default AdminPage;