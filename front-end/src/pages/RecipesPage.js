import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Button } from "react-bootstrap";
import axios from "axios";

const URL = 'http://localhost:8888'



const RecipesPage = () => {
 
    const [recipeIds, setRecipeIds] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const {id} = useParams();
    const location = useLocation();

    useEffect(() => {
        const headers = { "Content-Type": "application/json", 'Authorization': `Bearer ${location.state.tkn}`}
        console.log(headers)
        axios.get(`${URL}/users/${id}/recipes`, {headers})
        .then((response) => {
            setRecipeIds(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])



    useEffect(() => {
        console.log(recipeIds)
        getSavedRecipes()
    },[recipeIds])

    useEffect(()=> {
        console.log(recipes)
    }, [recipes])

    const getSavedRecipes = () => {
        const headers = { "Content-Type": "application/json", 'Authorization': `Bearer ${location.state.tkn}`}
        console.log(headers)
        recipeIds.forEach(recipe=> {
            axios.get(`${URL}/recipes/${recipe.RecipeId}`, {headers})
            .then((response) => {
                // destructures the array and appends to response.data.recipe to the end of it
                setRecipes(oldArr => [...oldArr, response.data.recipe]);
                // temp_list.push(response.data.recipe)
            }).catch((err) => {
                console.log(err);
            })
        })
    }

    const deleteRecipe = (recipe_id) => {
        const headers = { "Content-Type": "application/json", 'Authorization': `Bearer ${location.state.tkn}`}
        console.log(headers)
        axios.delete(`${URL}/users/${id}/recipes/${recipe_id}`, {headers}).then((response)=> {
            console.log(response, "DELETED RECIPE")
        }).catch((err) => {console.log(err)})
    }

    return (
        <React.Fragment>
            <h1> Deleting recipes </h1>
            <table id="the_table">
                <thead>
                    <th>Title</th>
                    <th>Description</th>
                </thead>
                <tbody>
                    {   
                          recipes.map((item) => {
                            return (
                                <div>
                                <tr key={item.Id}>
                                    <td> {item.Title} </td>
                                    <td> {item.Description} </td>
                                    <Button variant="primary" type="button" onClick={() => deleteRecipe(item.Id)}> Delete recipe </Button>
                                </tr>
                                </div>
                            )}
                        )
                 
                    }
                </tbody>
            </table>

        </React.Fragment>
    );
}

export default RecipesPage;