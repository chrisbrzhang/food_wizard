import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router";
import { Button } from "react-bootstrap";
import axios from "axios";

const RecipesComponent = () => {
    const URL = 'https://jakobandjonny.a2hosted.com/COMP4537/TermProject/api/v1';
    const navigate = useNavigate();
 
    const [recipeIds, setRecipeIds] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const {id} = useParams();
    const location = useLocation();
    const [dt, setDt] = useState([])

    useEffect(() => {
        const headers = { "Content-Type": "application/json", 'Authorization': `Bearer ${location.state.data.token}`}
        setDt(location.state.data)
        console.log(headers)
        axios.get(`${URL}/users/${id}/recipes`, {headers})
        .then((response) => {
            setRecipeIds(response.data);
            console.log(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(()=> {
        console.log(dt)
    }, [dt])



    useEffect(() => {
        console.log(recipeIds)
        getSavedRecipes()
    },[recipeIds])

    useEffect(()=> {
        console.log(recipes)
    }, [recipes])

    const getSavedRecipes = () => {
        const headers = { "Content-Type": "application/json", 'Authorization': `Bearer ${location.state.data.token}`}
        console.log(headers)
        recipeIds.forEach(recipe=> {
            console.log(recipe)
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

    const back_button = () => {
        navigate(`/user/${dt.Id}`, 
        {
            state: {data: dt}
        })
    }

    const deleteRecipe = (recipe_id) => {
        const headers = { "Content-Type": "application/json", 'Authorization': `Bearer ${location.state.data.token}`}
        console.log(headers)
        console.log(recipe_id)
        axios.delete(`${URL}/users/${id}/recipes/${recipe_id}`, {headers}).then((response)=> {
            console.log(response.data, "DELETED RECIPE")
            // deleteRecipeRow(recipe_id)
            
        }).catch((err) => {console.log(err)})
    }
    return (
        <div>
             <table id="the_table">
                <thead>
                    <th>Title</th>
                    <th>Description</th>
                </thead>
                <tbody>
                    {   
                          recipes.map((item) => {
                              {console.log(item)}
                            return (
                                <div>
                                <tr key={item.Id}>
                                    <td> {item.Title} </td>
                                    <td> {item.Description} </td>
                                    <Button variant="primary" type="button" onClick={() => {deleteRecipe(item.Id)}}> Delete recipe </Button>
                                </tr>
                                </div>
                            )}
                        )
                 
                    }
                </tbody>
            </table>
            <Button variant="primary" type="button" onClick={()=> back_button()}>
                    Back Button
            </Button>
        </div>
       
    )
}

export default RecipesComponent;