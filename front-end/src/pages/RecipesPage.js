import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecipesPage = () => {

    const [recipeIds, setRecipeIds] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", 'Authorization': `Bearer ${localStorage.getItem("token")}`}
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8888/users/${id}/recipes`, {headers})
        .then((response) => {
            console.log(response.data);
            setRecipeIds(response.data);
            console.log(recipeIds);
        }).catch((err) => {
            console.log(err);
        })
    }, []);

    useEffect(() => {
        recipeIds.forEach(recipe => {
            axios.get(`http://localhost:8888/recipes/${recipe.RecipeId}`, {headers})
            .then((response) => {
                let myRecipe = response.data.recipe;
                recipes.push(myRecipe)
            }).catch((err) => {
                console.log(err);
            })
        });
    }, [recipeIds]);

    return (
        <React.Fragment>
            <table>
                <thead>
                    <th>Title</th>
                    <th>Description</th>
                </thead>
                <tbody>
                    {
                        recipes.map((item) => (
                            <tr key={item.Id}>
                            <td> {item.Title} </td>
                            <td> {item.Description} </td>
                            {/* <Button variant="primary" type="button" onClick={() => saveRecipe(item.Id)}> Save recipe </Button> */}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </React.Fragment>
    );
}

export default RecipesPage;