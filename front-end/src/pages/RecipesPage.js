import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { Button } from "react-bootstrap";
import axios from "axios";


const RecipesPage = () => {
 
    const [recipeIds, setRecipeIds] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [token, setToken] = useState('')
    const {id} = useParams();
    const location = useLocation();


    useEffect(() => {
        console.log(token)
        const headers = { "Content-Type": "application/json", 'Authorization': `Bearer ${token}`}
        console.log(headers)
        axios.get(`http://localhost:8888/users/${id}/recipes`, {headers})
        .then((response) => {
            setRecipeIds(response.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [token])

    useEffect(() => {
        setToken(location.state.tkn);
    }, []);

    useEffect(() => {
        console.log(recipeIds)
        setRecipes(getSavedRecipes())
    },[recipeIds])

    useEffect(()=> {
        console.log(recipes)
    }, [recipes])

    const getSavedRecipes = () => {
        let temp_list = []
        const headers = { "Content-Type": "application/json", 'Authorization': `Bearer ${token}`}
        console.log(headers)
        recipeIds.forEach(recipe=> {
            axios.get(`http://localhost:8888/recipes/${recipe.RecipeId}`, {headers})
            .then((response) => {
                temp_list.push(response.data.recipe)
            }).catch((err) => {
                console.log(err);
            })
        })
        console.log("This is temp list", temp_list)
        return temp_list;
    }

    const deleteRecipe = (recipe_id) => {
        const headers = { "Content-Type": "application/json", 'Authorization': `Bearer ${token}`}
        console.log(headers)
        axios.delete(`http://localhost:8888/users/${id}/recipes/${recipe_id}`, {headers}).then((response)=> {
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
                        recipes.map((item) => (
                            <tr key={item.Id}>
                            <td> {item.Title} </td>
                            <td> {item.Description} </td> 
                            <Button variant="primary" type="button" onClick={() => deleteRecipe(item.Id)}> Save recipe </Button>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </React.Fragment>
    );
}

export default RecipesPage;