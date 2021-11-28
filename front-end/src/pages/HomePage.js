import React, { useState } from 'react';
// import {Helmet} from "react-helmet";
// import axios from 'axios';

const HomePage = () => {
    return (
    <React.Fragment>
    <div className='Home'>
        <form>
          <h1> Welcome to Jakob and friends </h1>
            <ol id="list_of_ingredients"></ol>
            <textarea id="ingredients_area"></textarea>
            {/* <button type="button" onClick= {() => add_ingredients()}> Add Ingredient </button>
            <button type="button"  onClick= {() => get_Recipe()}> GET RECIPES </button> */}
        </form>
        <div id="recipes"></div>
    </div>
    </React.Fragment>
    )};
export default HomePage;
