import { RecipeDetail } from "@/components/RecipeDetail";

export default async function RecipePage({params}: {params: Promise<{id: string}>}) {
  const { id } = await params;

  return (<RecipeDetail id={id}></RecipeDetail>);
}