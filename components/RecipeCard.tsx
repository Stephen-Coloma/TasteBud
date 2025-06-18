import { Recipe } from "@/types/recipe"
import { Card, CardContent, CardFooter } from "./ui/card"
import { Button } from "./ui/button"
import { Clock, ChefHat, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


export type RecipeCardProps = Recipe

export function RecipeCard({id, name, cookingTime, servings, image}: RecipeCardProps){
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/recipes/${id}`)
  }

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          fetchPriority="high"
          priority={true}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4 border-b">
        <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-red-500 transition-colors truncate">
          {name}
        </h3>
        <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground gap-2">
          <div className="flex items-center gap-1">
            <Clock className="bg-purple-100/50 rounded-full p-2 w-8 h-8" color="purple"/>
            <span className="font-bold truncate">{cookingTime} <span className="font-normal">minutes</span></span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="bg-green-100/50 rounded-full p-2 w-8 h-8" color="green"/>
            <span className="font-bold truncate">{servings} <span className="font-normal">serving</span></span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col p-4 gap-2 ">
        <Button 
          onClick={()=> handleClick(id)}
          className="w-full bg-red-600 hover:bg-red-700"
        >
          <ChefHat>/</ChefHat>
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  )
}