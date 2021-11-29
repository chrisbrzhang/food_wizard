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
                {/* <form> */}
                    <h1> Welcome to Recipe Wizard! </h1>
                    {/* <p><a href="/login">Log in</a> or <a href="/register">Create an account</a> to get started!</p> */}
                {/* </form> */}
                <div id="recipes"></div>
            </div>
            </React.Fragment>
        );
    }
};
export default HomePage;
