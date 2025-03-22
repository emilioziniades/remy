import { Title } from "@solidjs/meta";
import { createAsync, query } from "@solidjs/router";
import { For } from "solid-js";
import { listRecipes } from "~/server/recipes";

export default function Home() {
  const recipes = createAsync(() => query(listRecipes, "recipes")());
  return (
    <main>
      <Title>Recipes</Title>
      <h1>Recipes</h1>
      <table>
        <For each={recipes()}>
          {(recipe) => (
            <tr>
              <td>
                <a href={`/recipes/${encodeURIComponent(recipe)}`}>{recipe}</a>
              </td>
            </tr>
          )}
        </For>
      </table>
      <ul></ul>
    </main>
  );
}
