import { Ingredient } from "@cooklang/cooklang-ts";
import Fraction from "fraction.js";

export const prettyQuantity = (quantity: number | string): string => {
  if (typeof quantity == "number") {
    return new Fraction(quantity).toFraction(true).toString();
  }

  return quantity;
};

export const dedupeIngredients = (ingredients: Ingredient[]): Ingredient[] => {
  return ingredients;
};
