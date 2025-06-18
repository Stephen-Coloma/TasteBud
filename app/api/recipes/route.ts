import { NextRequest, NextResponse } from "next/server";
import recipeData from "../../../data/recipes.json"; // load the data

export async function GET(request: NextRequest) {
  // check for filter query parameters
  const { searchParams } = new URL(request.url);
  const searchValue = searchParams.get("searchKey")?.toLowerCase();
  const recipeId = searchParams.get("id");

  // search by id
  if (recipeId) {
    const recipe = recipeData.filter((recipe) => recipe.id === recipeId)[0]; // first element of the array
    return recipe
      ? NextResponse.json(recipe)
      : new NextResponse("Recipe Not Found", { status: 404 });
  } else if (searchValue) {
    // search by name
    const filteredData = recipeData.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchValue)
    );
    return filteredData.length > 0
      ? NextResponse.json(filteredData)
      : new NextResponse("No Such Recipe", { status: 404 });
  } else {
    return NextResponse.json(recipeData);
  }
}
