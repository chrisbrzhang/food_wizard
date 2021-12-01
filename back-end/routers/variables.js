let variables = {
    "update_password_put": [0,"/users/:id", "PUT"],
    "all_users_get": [0, "/users", "GET"],
    "user_id_get": [0, "/users/:id", "GET"],
    "all_user_ingredients_get": [0, "/users/:id/ingredients", "GET"],
    "single_user_ingredient_get": [0, "/users/:id/ingredients", "GET"],
    "single_user_ingredient_post": [0, "URL", "POST"],
    "list_user_ingredients_post": [0, "URL", "POST"],
    "user_ingredient_by_id_delete": [0, "URL", "DELETE"],
    "user_saved_recipes_get": [0, "URL", "GET"],
    "single_user_saved_recipe_get": [0, "URL"," GET"],
    "save_recipe_by_id_post": [0, "URL", "POST"],
    "saved_recipe_delete": [0, "URL", "DELETE"],
    "suggested_recipe_get": [0, "URL", "GET"],

    "create_new_user_post": [0, "URL", "POST"],

    "all_recipes_get": [0, "URL", "GET"],
    "one_recipe_get": [0, "URL", "GET"],
    "recipe_post": [0,"URL", "POST"],
    "login_post": [0, "URL", "POST"]
}

exports.variables = variables;






