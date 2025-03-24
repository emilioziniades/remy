use askama::Template;
use axum::{Router, response::Html, routing::get};

#[tokio::main]
async fn main() {
    // build our application with a route
    let app = Router::new().route("/", get(handler));

    // run it
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("listening on http://{}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

async fn handler() -> Html<String> {
    let hello = Hello { name: "world" };
    Html(hello.render().unwrap())
}

#[derive(Template)]
#[template(path = "hello.html")]
#[allow(dead_code)]
struct Hello<'a> {
    name: &'a str,
}
