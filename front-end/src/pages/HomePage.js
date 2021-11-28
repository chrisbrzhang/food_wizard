import React, { useState } from 'react';
// import {Helmet} from "react-helmet";
// import axios from 'axios';

const HomePage = () => {
    if (localStorage.getItem("token") != null) {
        return (
            <React.Fragment>
            <div className='Home'>
                <form>
                  <h1> Welcome to Recipe Wizard! </h1>
                    <ol id="list_of_ingredients"></ol>
                    <textarea id="ingredients_area"></textarea>
                    {/* <button type="button" onClick= {() => add_ingredients()}> Add Ingredient </button>
                    <button type="button"  onClick= {() => get_Recipe()}> GET RECIPES </button> */}
                </form>
                <div id="recipes"></div>
            </div>
            </React.Fragment>
            )
    } else {
        return (
            <React.Fragment>
            <div className='Home'>
                <form>
                    <h1> Welcome to Recipe Wizard! </h1>
                    <p><a href="/login">Log in</a> or <a href="/register">Create an account</a> to get started!</p>
                </form>
                <div id="recipes"></div>
            </div>
            </React.Fragment>
        );
    }
};
export default HomePage;
