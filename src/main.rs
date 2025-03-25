mod templates;

use std::{ffi::OsStr, fs};

use askama::Template;
use axum::{
    Router,
    extract::{FromRef, Path, State},
    response::Html,
    routing::get,
};
use clap::Parser;
use templates::RecipeInfo;
use walkdir::WalkDir;

#[derive(Parser, Clone)]
struct Config {
    /// Directory containing cooklang recipes
    #[arg(default_value = ".")]
    recipes_directory: String,
}

#[derive(Clone)]
struct AppState {
    config: Config,
}

impl FromRef<AppState> for Config {
    fn from_ref(app_state: &AppState) -> Self {
        app_state.config.clone()
    }
}

#[tokio::main]
async fn main() {
    let cli = Config::parse();

    let state = AppState { config: cli };

    // build our application with a route
    let app = Router::new()
        .route("/", get(index))
        .route("/recipe/{recipe_id}", get(recipe))
        .with_state(state);

    // run it
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("listening on http://{}", listener.local_addr().unwrap());

    axum::serve(listener, app).await.unwrap();
}

async fn index(State(config): State<Config>) -> Html<String> {
    let recipes = get_recipes(config.recipes_directory);
    println!("{recipes:?}");
    Html(templates::Index { recipes }.render().unwrap())
}

async fn recipe(Path(recipe_id): Path<String>, State(config): State<Config>) -> Html<String> {
    // TODO: this is slow - rather load a cache of recipes into an in-memory sqlite DB or something
    // like that
    let recipes = get_recipes(config.recipes_directory);
    let recipe = recipes.iter().find(|r| r.name == recipe_id).unwrap();

    let raw_recipe = fs::read_to_string(recipe.path.clone()).unwrap();
    // TODO: rather create one parser on boot-up and re-use it
    let parsed_recipe = cooklang::parse(&raw_recipe).unwrap_output();

    println!("{parsed_recipe:#?}");

    Html(
        templates::Recipe {
            name: recipe_id,
            recipe: parsed_recipe,
        }
        .render()
        .unwrap(),
    )
}

fn get_recipes(directory: String) -> Vec<RecipeInfo> {
    WalkDir::new(directory)
        .into_iter()
        .map(|recipe| recipe.unwrap())
        .filter(|recipe| {
            recipe.file_type().is_file()
                && recipe
                    .path()
                    .extension()
                    .is_some_and(|ext| ext == OsStr::new("cook"))
        })
        .map(|recipe| recipe.into_path())
        .map(|recipe| RecipeInfo {
            name: recipe.file_stem().unwrap().to_str().unwrap().into(),
            path: recipe.to_str().unwrap().into(),
        })
        .collect()
}
