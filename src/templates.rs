use askama::Template;
use cooklang::Content;
use cooklang::Item;

#[derive(Template)]
#[template(path = "index.html")]
pub struct Index {
    pub recipes: Vec<RecipeInfo>,
}

#[derive(Debug)]
pub struct RecipeInfo {
    pub name: String,
    pub path: String,
}

#[derive(Template)]
#[template(path = "recipe.html", whitespace = "suppress")]
pub struct Recipe {
    pub name: String,
    pub recipe: cooklang::ScalableRecipe,
}

#[derive(Template)]
#[template(path = "404.html", whitespace = "suppress")]
pub struct NotFound();
