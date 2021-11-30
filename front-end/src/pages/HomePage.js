import React, { useState } from 'react';
// import {Helmet} from "react-helmet";
// import axios from 'axios';

const HomePage = () => {


    if (localStorage.getItem("token") != null) {
        return (
            <React.Fragment>
            <div className='Home'>
                <h1> Welcome to Recipe Wizard! </h1>
            </div>
            </React.Fragment>
            )
    } else {
        return (
            <React.Fragment>
            <div className='Home'>
                <form>
                    <h1> Welcome to Recipe Wizard! </h1>
                </form>
                <div id="recipes"></div>
            </div>
            </React.Fragment>
        );
    }
};
export default HomePage;
