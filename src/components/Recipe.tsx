import {
  Cookware,
  Ingredient,
  ParseResult,
  Text,
  Timer,
} from "@cooklang/cooklang-ts";
import Fraction from "fraction.js";
import { For } from "solid-js";

type SubStep = Ingredient | Cookware | Timer | Text;

export default function Recipe(props: { recipe?: ParseResult }) {
  return (
    <>
      <section>
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
      </section>
      <section>
        <For each={props.recipe?.steps}>
          {(stepSection) => (
            <p>
              <For each={stepSection}>{(step) => <Step step={step} />}</For>
            </p>
          )}
        </For>
      </section>
    </>
  );
}

function Step(props: { step: SubStep }) {
  if (props.step.type == "text") {
    return <span>{props.step.value}</span>;
  } else if (props.step.type == "ingredient") {
    return (
      <span
        style="color: red;"
        data-tooltip={`${asFraction(props.step.quantity)} ${props.step.units}`}
      >
        {props.step.name}
      </span>
    );
  } else if (props.step.type == "cookware") {
    return <span style="color: orange;">{props.step.name}</span>;
  } else if (props.step.type == "timer") {
    return (
      <span style="color: green;">
        {props.step.quantity} {props.step.units}
      </span>
    );
  }
}

function asFraction(n: number | string) {
  if (typeof n == "number") {
    return new Fraction(n).toFraction(true).toString();
  } else {
    return n;
  }
}
