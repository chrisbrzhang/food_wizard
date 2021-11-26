import React, { useState } from 'react';
// import {Helmet} from "react-helmet";
// import axios from 'axios';

const HomePage = () => {
    const [RESOURCE] = useState('&ingredients=')

    const get_Recipe = async () => {
        const axios = require('axios');
        let ingredient = document.getElementById('ingredients_area').value;
        let list = query_ol()
        console.log(list)
        if (list.length < 3) {
            alert("Please insert more ingredients");
            // return
        }

        let query_param = list.join(",+");
        query_param = query_param.toLowerCase();
        console.log(query_param);
        console.log(URL + API_KEY + RESOURCE + ingredient + query_param)
        // lets use this api for now so we dont overload our thing
        axios.get("https://api4all.azurewebsites.net/api/Students")
        .then((response) => {
            new_Recipe(response.data)
            console.log(response.data)})
        .catch((error) => {console.log(error, "ERRORS BRUHHH")});
    }
    const new_Recipe = (res) => {
        let big_div = document.getElementById('recipes')
        if (res.length > 1) {
            res.forEach(element => {
                console.log(element.studentId)
                let div = React.createElement('div',
                {
                    className: "container"
                });
        
                let textArea = React.createElement('textarea',
                {},
                element.studentId
                );
                div.append(textArea)
                big_div.append(div)
            })
        }
    }
    // returns a list of nodes containing all li tags
    const query_ol = () => {
        let ol = document.getElementById("list_of_ingredients");
        let li = ol.querySelectorAll("li");
        let list = []
        for (var i = 0; i < li.length; i++) {
            console.log(li[i].innerHTML)
            list.push(li[i].innerHTML)
        }
        return list
    }
    
    const add_ingredients = () => {
        let ol = document.getElementById("list_of_ingredients");
        let li = document.createElement("li");
        let text = document.getElementById('ingredients_area').value.trim();
        document.getElementById('ingredients_area').value = '';
       
        if (text.length == 0) {
            alert("Field cannot be empty");
            // gets out of the function
            return
        }
        let word = document.createTextNode(text);
        li.appendChild(word);
        ol.append(li);
    }
    return (
    <React.Fragment>
    <div className='Home'>
        <form>
          <h1> Ingredients List </h1>
            <ol id="list_of_ingredients"></ol>
            <textarea id="ingredients_area"></textarea>
            <button type="button" onClick= {() => add_ingredients()}> Add Ingredient </button>
            <button type="button"  onClick= {() => get_Recipe()}> GET RECIPES </button>
        </form>
        <div id="recipes"></div>
    </div>
    </React.Fragment>)
};
export default HomePage;
