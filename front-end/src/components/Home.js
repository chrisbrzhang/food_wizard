import React, { useState } from 'react';
import {Helmet} from "react-helmet";
import axios from 'axios';

// to use contants do constants.constantname
const Home = () => { 

    const [URL, setURL] = useState('https://api.spoonacular.com/recipes/findByIngredients?apiKey=')
    const [API_KEY, setAPIKEY] = useState('c0c634289d2a4a2590b2eaa4abf5f6aa')
    const [RESOURCE, setRESOURCES] = useState('&ingredients=')



    const get_Recipe = async () => {

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
    
    
    
        axios.get(URL +API_KEY + RESOURCE + ingredient + query_param)
        .then((reponse) => console.log(reponse))
        .catch((error) => console.log(error));
    
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
    ( 
    <React.Fragment>
    <div className='Home'>
        <form>
          <h1> Ingredients List </h1>
            <ol id="list_of_ingredients"></ol>
            <textarea id="ingredients_area"></textarea>
            <button type="button" onClick= {() => add_ingredients}> Add Ingredient </button>
            <button type="submit"  onClick= {() => get_Recipe()}> GET RECIPES </button>
        </form>
        <form>
            <textarea id="recipe"></textarea>
        </form>
        <Helmet>
            <script src="../js/api_call.js" type="text/javascript"/>
        </Helmet>
    </div>
    </React.Fragment>
)};

export default Home;
