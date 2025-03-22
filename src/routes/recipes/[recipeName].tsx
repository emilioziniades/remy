import { Title } from "@solidjs/meta";
import { createAsync, query, useParams } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import Recipe from "~/components/Recipe";
import { getRecipe } from "~/server/recipes.ts";

export default function RecipePage() {
  const params = useParams();
  const recipeName = decodeURIComponent(params.recipeName);
  const recipe = createAsync(() => query(getRecipe, "recipe")(recipeName));
  return (
    <main>
      <Title>{recipeName}</Title>
      <h1>{recipeName}</h1>
      <ErrorBoundary
        fallback={(error, _reset) => (
          <div>
            <h2>Oops!</h2>
            <p>{error.message}</p>
          </div>
        )}
      >
        <Recipe recipe={recipe()} />
      </ErrorBoundary>
    </main>
  );
}
