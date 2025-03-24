import {
  Cookware,
  Ingredient,
  ParseResult,
  Text,
  Timer,
} from "@cooklang/cooklang-ts";
import { For } from "solid-js";
import { prettyQuantity } from "~/lib/recipes";

type SubStep = Ingredient | Cookware | Timer | Text;

export default function Recipe(props: { recipe?: ParseResult }) {
  return (
    <>
      <hr />
      <details>
        <summary>
          <b>Metadata</b>
        </summary>
        <For each={Object.entries(props.recipe?.metadata ?? [])}>
          {([key, value]) => (
            <>
              <i>
                {key}: {value}
              </i>
              <br />
            </>
          )}
        </For>
      </details>
      <hr />
      <details open>
        <summary>
          <b>Recipe</b>
        </summary>
        <For each={props.recipe?.steps}>
          {(stepSection) => (
            <p>
              <For each={stepSection}>{(step) => <Step step={step} />}</For>
            </p>
          )}
        </For>
      </details>
      <hr />
      <details>
        <summary>
          <b>Ingredients</b>
        </summary>
        <table>
          <For each={props.recipe?.ingredients}>
            {(ingredient) => (
              <tr>
                <td>{ingredient.name}</td>
                <td>
                  {`${prettyQuantity(ingredient.quantity)} ${ingredient.units}`}
                </td>
              </tr>
            )}
          </For>
        </table>
      </details>
      <hr />
    </>
  );
}

function Step(props: { step: SubStep }) {
  if (props.step.type == "text") {
    return <span>{props.step.value}</span>;
  } else if (props.step.type == "ingredient") {
    return (
      <span
        style="color: khaki;"
        data-tooltip={`${prettyQuantity(props.step.quantity)} ${props.step.units}`}
      >
        {props.step.name}
      </span>
    );
  } else if (props.step.type == "cookware") {
    return <span style="color: dodgerblue;">{props.step.name}</span>;
  } else if (props.step.type == "timer") {
    return (
      <span style="color: orange;">
        {prettyQuantity(props.step.quantity)} {props.step.units}
      </span>
    );
  }
}
