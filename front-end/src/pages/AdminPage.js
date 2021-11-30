import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";

const URL = 'http://localhost:8888';

const AdminPage = () => {
    const location = useLocation();
    const [requests, setRequests] = useState({})

    useEffect(()=> {
        // setToken(location.state.data.token)
        const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${location.state.data.token}`}
        axios.get(`${URL}/users/request`, {headers}
        )
        .then((response) => {
            console.log(response)
            setRequests(response.data)
       
        })
        .catch(function (error) {
            console.log(error);
        });
    },[])

    useEffect(()=> {
        console.log(requests)
    },[requests])

  

    return (
            <React.Fragment>
                <h1> Admin Page </h1>
                <table id="the_table">
                <thead>
                    <th>Request URL</th>
                    <th>Number of Requests</th>
                </thead>
                <tbody>
                    {
                        Object.entries(requests)
                        .map(([key, value]) => 
                        { return(
                            <tr className="table-row">
                                <td key={`${key}`}> {key} </td>
                                <td key={`${value}`}> {value} </td>
                            </tr>
                        )

                        })

                        // Object.entries(test)
                        // .map(([key, value])=> {
                        //     <tr className="table-row">
                        //         <td key={`${key}`}> {key} </td>
                        //         <td key={`${value}`}> {value} </td>
                        //     </tr>

                        // })
                    }
           

                </tbody>

            </table>
            </React.Fragment>
         
        )
    };


export default AdminPage;