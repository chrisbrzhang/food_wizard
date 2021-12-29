import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";


const AdminComponent = () => {

    const location = useLocation();
    const URL = 'https://jakobandjonny.a2hosted.com/COMP4537/TermProject/api/v1';
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
            <table class="table table-striped" id="the_table" style={{tableLayout: 'fixed', width: '65%'}}>
                <thead>
                    <th>Method</th>
                    <th>Request URL</th>
                    <th>Number of Requests</th>
                </thead>
                <tbody>
                    {
                        Object.entries(requests)
                        .map(([key, value]) => 
                        { return(
                            <tr className="table-row">
                                <td key={`${key}`}> {value[2]} </td>
                                <td key={`${value}`}> /api/v1{value[1]} </td>
                                <td key={`${value}`}> {value[0]} </td>
                            </tr>
                        )

                        })
                    }
           
                </tbody>
            </table>
        )

}

export default AdminComponent;
    