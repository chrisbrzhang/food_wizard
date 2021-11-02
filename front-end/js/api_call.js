const url = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=";
const xhttp = new XMLHttpRequest();
const get = "GET";
const post = "POST"
const resource="&ingredients=";
// test out https://api.spoonacular.com/recipes/findByIngredients?apiKey=API_KEY&ingredients=apples in your url to get json respone

function api_find_by_ingredients(ingredients) {

    let ingredient = document.getElementById('ingredients_area').value;


    xhttp.open(get, url +API_KEY + resource+ ingredient, true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementById("recipe").innerHTML = this.responseText;
        }
    }
}