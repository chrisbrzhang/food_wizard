import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const WeatherPage = () => {


    const location = useLocation();
  

    const value = location.state.weatherdata;



    


    return (
        <React.Fragment>
            <h1> Weather Page </h1>
            <table>
            {value.map(data =><td>{data.date} {data.temperatureC} {data.temperatureF} {data.summary}</td>)}
            </table>
        </React.Fragment>
    )
}

export default WeatherPage;