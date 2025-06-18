'use client'

import { Recipe } from "@/types/recipe";
import { useFetch } from "@/hooks/useFetch";
import { useState, useEffect, ChangeEvent } from 'react'
import { RecipeCard } from "@/components/RecipeCard";
import { ChefHat, Search, LoaderCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { RecipeNotFound } from "@/components/RecipesNotFound";
import { useMemo } from "react";
import debounce from "lodash.debounce";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentUrl, setCurrentUrl] = useState('api/recipes'); //use to trigger useEffect inside useFetch

  const {status, data: fetchedRecipes, loading} = useFetch<Recipe[]>(currentUrl);

  const debouncedResults = useMemo(()=> 
    debounce(async (e: ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value.toLowerCase();
      setCurrentUrl(`api/recipes?searchKey=${term}`);
    }, 300), //300ms debunce delay
  [])

  useEffect(()=>{
    if(status === 200 && fetchedRecipes){
      setRecipes(fetchedRecipes);
    }
  }, [loading])
  
  useEffect(() => {
    return () => {
      debouncedResults.cancel(); // clean up
    };
  }, [debouncedResults]);

    return (
      <>
        <header className="container mx-auto flex flex-col md:flex-row items-center justify-between h-auto w-full p-4 gap-4 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
          {/* logo */}
          <div className="flex items-center gap-2">
            <ChefHat size={50} className='p-2 rounded-full bg-red-100/50' color="red"/>
            <h1 className="hidden sm:block font-bold text-2xl text-red-500">TasteBud</h1>
          </div>
          {/* search bar */}
          <div className="flex w-full max-w-md items-center gap-2 bg-red-500 rounded-full p-1 pr-4 ">
            <Input className="bg-white rounded-full focus-visible:ring-red-500" 
              type="search" 
              placeholder="Search a dish" 
              onChange={debouncedResults}
            >
            </Input>
              <Search color="white"/>
          </div>
        </header>
        {/* banner */}
        <div className="text-center my-10">
          <h1 className="text-5xl mb-2 font-bold bg-gradient-to-r from-red-700 via-red-500 to-red-400 text-transparent bg-clip-text">
            Exceptional Recipes
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            Discover extraordinary dishes crafted by world-class chefs, each recipe tells a story of passion, tradition
            and culinary excellence.
          </p>
        </div>
        <div className="container mx-auto min-h-screen overflow-y-auto">
          {loading 
          ? <div className="flex flex-col gap-2 items-center w-full py-20">
              <LoaderCircle className="animate-spin" color='red' size={40}/>
              <p className="text-muted-foreground font-medium text-xl">Discovering amazing recipes...</p>
            </div>
          : (status === 404) 
            ? <RecipeNotFound/>
            : <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:gap-8 md:p-8">
                {recipes.map((recipe)=>{
                  return <RecipeCard key={recipe.id} {...recipe}></RecipeCard>
                })}
              </div>
          }
        </div>
      </>
    )
}