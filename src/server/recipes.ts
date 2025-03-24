import fs from "fs/promises";
import { Parser, ParseResult } from "@cooklang/cooklang-ts";

export const getRecipesDirectory = async (): Promise<string> => {
  "use server";
  const recipeDirectory = process.env.REMY_RECIPE_DIRECTORY;

  if (!recipeDirectory) {
    throw "REMY_RECIPE_DIRECTORY environment variable not set";
  }

  return recipeDirectory;
};

export const listRecipes = async (): Promise<string[]> => {
  "use server";
  const recipes = await Array.fromAsync(
    fs.glob("./**/*.cook", { cwd: await getRecipesDirectory() }),
  );
  return recipes.map((x) => x.replace(/\.cook$/, ""));
};

export const getRecipe = async (name: string): Promise<ParseResult> => {
  "use server";
  const filePath = (await getRecipesDirectory()) + "/" + name + ".cook";
  const file = await fs.readFile(filePath);
  const recipe = new Parser().parse(file.toString());

  return recipe;
};
