import React, {useState, useEffect} from "react";
import { useLocation } from "react-router";
import axios from "axios";

const AdminPage = () => {
    const [data, setData] = useState('');
    const location = useLocation();

    useEffect (() => {
        if (location.state != null) {
            setData(location.state.data);
        } else {
            console.log("No admin account detected.");
        }
    }, [])

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
            <h1>Admin Page </h1>

            <p>Log in as an admin to view this page.</p>
        </React.Fragment>
       );
   }

}


export default AdminPage;