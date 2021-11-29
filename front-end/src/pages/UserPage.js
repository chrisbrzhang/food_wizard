import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const UserPage = () => {

    const location = useLocation();
    const [dt, setDt] = useState([])
    const [recipe, setRecipe] = useState([]);
    // to make use of the token do data.token
    const {id} = useParams();
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        console.log(ingredients)
        post_ingredients()
    },[ingredients])

    useEffect(() => {
        if (location.state == null) {
            navigate('/login');     
            console.log(location.state)
        }
        else {
            setDt(location.state.data)
        }

    }, [])

    useEffect(()=> {
        console.log("RECIPEEES")
        console.log(recipe)
        recipe.map((recipes)=> console.log(recipes.Title))
    },[recipe])

    const changePw = () => {
        navigate(`/user/${dt.Id}/update`, 
        {
            state: {tkn: dt.token, email: dt.Email}
        })
    }

    // creates new textarea so the user can put in new ingredients
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
    // gets ingredients list and sets the ingredients variable to that list
    const query_ol = () => {
        let ol = document.getElementById("list_of_ingredients");
        let li = ol.querySelectorAll("li");
        let list = []
        for (var i = 0; i < li.length; i++) {
            console.log(li[i].innerHTML)
            list.push(li[i].innerHTML)
        }
        setIngredients(list)
    }

    const post_ingredients = () => {
        const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${dt.token}`}
        console.log(headers)
        axios.post(`http://localhost:8888/users/${id}/batch`, {"list": ingredients}, {headers})
        .then((response) => {
            console.log(response)
            if (response.data.success == false) {
                alert(response.data.message)
           
            }
            else {
                console.log(response)
                alert("Ingredients added");
                suggest_recipe()
            }
            
        }).catch((error) => {
            console.log(error)
    })
}


    const suggest_recipe = () => {
        const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", 'Authorization': `Bearer ${dt.token}`}
        console.log("THIS IS HEADERS ", headers)
        axios.get(`http://localhost:8888/users/${id}/suggested`, {headers})
        .then((response)=> {
            console.log(response.data);
            setRecipe(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const saveRecipe = (recipe_id) => {
        const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", 'Authorization': `Bearer ${dt.token}`}
        console.log(recipe_id);
        axios.post(`http://localhost:8888/users/${id}/recipes`, {"recipeId": recipe_id}, {headers})
        .then((response) => {
            console.log(response)
        }).catch((err) =>{
            console.log(err)
        })
    }

    return (
        <React.Fragment>
            <div className='Home'>
                <h1> Welcome {dt.Email} </h1>
                <p> {String(dt.token)} </p>
                <p> this is the id: {id} </p>
                <ol id="list_of_ingredients"/>
                <textarea id="ingredients_area"/>
                <Form>
                    <Button variant="primary" type="button" onClick={()=> add_ingredients()}> Add Ingredient </Button>
                    <Button variant="primary" type="button" onClick={()=> query_ol()}> Suggest recipe </Button>
                </Form>

            </div>
            <table id="the_table">
                <thead>
                    <th>Title</th>
                    <th>Description</th>
                </thead>
                <tbody>
                    {
                        recipe.map((item) => (
                            <tr key={item.Id}>
                            <td> {item.Title} </td>
                            <td> {item.Description} </td>
                            <Button variant="primary" type="button" onClick={() => saveRecipe(item.Id)}> Save recipe </Button>
                            </tr>
                        ))
                    }
                </tbody>

            </table>
           
            <Form>
                <Button variant="primary" type="button" onClick= {() => changePw()}>
                    Change Password
                </Button>
            </Form>

        </React.Fragment>
    )
}

export default UserPage;