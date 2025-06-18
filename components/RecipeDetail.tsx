"use client"

import { useFetch } from "@/hooks/useFetch"
import type { Recipe } from "@/types/recipe"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, Users, ArrowLeft, LoaderCircle, ChefHat, CookingPot, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { RecipeNotFound } from "./RecipesNotFound"

export type RecipeDetailProps = {
  id: string
}

export function RecipeDetail({ id }: RecipeDetailProps) {
  const router = useRouter();
  const [recipe, setRecipe] = useState<Recipe>()
  const { status, data: fetchedRecipe, loading } = useFetch<Recipe>(`/api/recipes?id=${id}`)

  useEffect(() => {
    if (status === 200 && fetchedRecipe) {
      setRecipe(fetchedRecipe)
    }
  }, [loading])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Button 
            className="gap-2 bg-red-600 hover:bg-red-700"
            onClick={()=> {router.push('/')}}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Recipes
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {loading 
        ? <div className="min-h-[90%] flex flex-col gap-2 items-center justify-center w-full py-20">
            <LoaderCircle className="animate-spin" color='red' size={40}/>
            <p className="text-muted-foreground font-medium text-xl">Loading Recipe Details...</p>
          </div>
        : (recipe && status !== 404)
          ? 
            <>
              {/* upper section */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* image */}
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={recipe.image}
                    fill
                    className="object-cover"
                    fetchPriority="high"
                    priority={true}
                    alt={recipe.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* details */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-red-100 rounded-full py-2 px-4 hover:bg-red-200 text-red-700 border-red-200">
                        <ChefHat className="w-4 h-4 mr-1" />
                        Featured Recipe
                      </Badge>
                    </div>
                    <h1 className="text-4xl font-bold text-primary hover:text-red-500 transition-colors">{recipe.name}</h1>
                  </div>

                  {/* cookin and serving */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="border-0 bg-white/60 backdrop-blur-sm">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Clock className="bg-purple-100/50 rounded-full p-2 w-8 h-8" color="purple"/>
                        <div>
                          <p className="text-sm text-gray-600">Cooking Time</p>
                          <p className="font-semibold text-gray-900">{recipe.cookingTime} minutes</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 bg-white/60 backdrop-blur-sm">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Users className="bg-green-100/50 rounded-full p-2 w-8 h-8" color="green"/>
                        <div>
                          <p className="text-sm text-gray-600">Servings</p>
                          <p className="font-semibold text-gray-900">{recipe.servings} people</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>

              {/* lower section */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* ingredientnts */}
                <div className="lg:col-span-1">
                  <Card className="group border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-muted-foreground mb-6 flex items-center gap-2 group-hover:text-red-500">
                        <CookingPot className=""></CookingPot>
                        Ingredients
                      </h2>
                      <div className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{ingredient.trim()}</span>
                          </div>
                        ))}  
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* instructions */}
                <div className="lg:col-span-2">
                  <Card className="group border-0 bg-white/80 backdrop-blur-sm shadow-lg">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold text-muted-foreground mb-6 flex items-center gap-2 group-hover:text-red-500">
                        <UtensilsCrossed></UtensilsCrossed>
                        Instructions
                      </h2>
                      <div className="space-y-4">
                          {recipe.instructions.map((instruction, index) => (
                            <div key={index} className="flex gap-4 p-4 rounded-lg hover:bg-red-50 transition-colors">
                              <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-red-400 text-white rounded-xl flex items-center justify-center font-semibold text-sm">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-700 leading-relaxed">{instruction.trim()}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>  
            </>
          : <RecipeNotFound/>
        }
      </div>
    </div>
  )
}