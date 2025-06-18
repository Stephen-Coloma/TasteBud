import { ChefHat } from "lucide-react"

export function RecipeNotFound() {
  return (
    <div className="items-center justify-center py-4">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        {/* Chef hat icon */}
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
          <ChefHat className="w-8 h-8 text-muted-foreground" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900">We couldn&apos;t find any recipes matching</h2>
          <p className="text-muted-foreground">Our chefs are still working on new recipes</p>
        </div>
      </div>
    </div>
  )
}