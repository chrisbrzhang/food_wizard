const url = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=";
const xhttp = new XMLHttpRequest();
const get = "GET";
const post = "POST"
const resource="&ingredients=";
// test out https://api.spoonacular.com/recipes/findByIngredients?apiKey=c0c634289d2a4a2590b2eaa4abf5f6aa&ingredients=apples in your url to get json respone

function get_recipes() {

    let ingredient = document.getElementById('ingredients_area').value;
    let list = query_ol()
    console.log(list)
    if (list.length < 3) {
        alert("Please insert more ingredients")
        // return
    }
    let query_param = list.join(",+")
    console.log(query_param)
    // for (let i = 0; i < list.length; i++) {
    //     console.log(list[i].innerHTML)
    // }

    // xhttp.open(get, url +API_KEY + resource+ ingredient, true);
    // xhttp.send();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         console.log(this.responseText);
    //         document.getElementById("recipe").innerHTML = this.responseText;
    //     }
    // }
}
// returns a list of nodes containing all li tags
function query_ol() {
    let ol = document.getElementById("list_of_ingredients");
    let li = ol.querySelectorAll("li");
    let list = []
    for (var i = 0; i < li.length; i++) {
        console.log(li[i].innerHTML)
        list.push(li[i].innerHTML)
    }
    return list
}

function add_ingredients() {
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