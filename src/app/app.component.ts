import { Component, OnInit } from '@angular/core';

import { PgDataService } from './pg-data.service';

import recipeJSON from './recipes.json';
import itemJSON from './items.json';
import recipeSourceJSON from './sources_recipes.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pg-craft-grinder';

  recipesArray = [];
  itemArray = [];
  recipeSourceArray = [];

  cookingRecipes = [];

  cookingXPLevels = [
    10, // exp needed for level 1
    50,
    50,
    50,
    50,
    250,
    250,
    250,
    250,
    250,
    500,
    500,
    500,
    500,
    500,
    750,
    750,
    750,
    750,
    750,
    1250,
    1250,
    1250,
    1250,
    1250,
    1750,
    1750,
    1750,
    1750,
    1750,
    2500,
    2500,
    2500,
    2500,
    2500,
    3250,
    3250,
    3250,
    3250,
    3250,
    4000,
    4000,
    4000,
    4000,
    4000,
    5000,
    5000,
    5000,
    5000,
    5000,
    6000,
    6000,
    6000,
    6000,
    6000,
    7000,
    7000,
    7000,
    7000,
    7000,
    8000,
    8000,
    8000,
    8000,
    8000,
    9000,
    9000,
    9000,
    9000,
    9000
  ];

  constructor(private dataService: PgDataService) { }

  ngOnInit() {

    // http://cdn.projectgorgon.com/v327/data/index.html
    // http://cdn.projectgorgon.com/v327/icons/icon_5010.png

    for (const recipeName in recipeJSON) {
      const recipeNumber = recipeName.split('_')[1];

      this.recipesArray.push({
        "RecipeId": Number(recipeNumber),
        "Recipe": recipeJSON[recipeName]
      });
    }

    for (const itemName in itemJSON) {
      const itemNumber = itemName.split('_')[1];

      this.itemArray.push({
        "ItemNumber": Number(itemNumber),
        "Item": itemJSON[itemName]
      });
    }

    for (const sourceName in recipeSourceJSON) {
      const recipeNumber = sourceName.split('_')[1];

      this.recipeSourceArray.push({
        "RecipeNumber": Number(recipeNumber),
        "Source": recipeSourceJSON[sourceName]
      });
    }

    console.log(this.itemArray);
    console.log(this.recipeSourceArray);

    this.recipesArray.sort((n1, n2) => n1.Recipe.SkillLevelReq - n2.Recipe.SkillLevelReq);

    this.getCookingRecipes();
  }

  getCookingRecipes() {
    // Description: "Cooks a nice fried clownfish. Requires a stove or fire pit."
    // IconId: 5038
    // Ingredients: Array(3) [ {…}, {…}, {…} ]
    // InternalName: "FriedClownfish"
    // Keywords: Array [ "MealRecipe" ]
    // Name: "Fried Clownfish"
    // ResultItems: Array [ {…}, {…} ]
    // RewardSkill: "Cooking"
    // RewardSkillXp: 10
    // RewardSkillXpDropOffLevel: 10
    // RewardSkillXpDropOffPct: 0.1
    // RewardSkillXpDropOffRate: 5
    // RewardSkillXpFirstTime: 40
    // Skill: "Cooking"
    // SkillLevelReq: 0

    this.recipesArray.forEach(recipe => {

      if (recipe.Recipe.Skill === 'Cooking') {
        // console.log(recipe.SkillLevelReq, recipe.Name);

        recipe.Recipe.Ingredients = this.getRecipeItems(recipe.Recipe.Ingredients);
        recipe.Recipe.Source = this.getRecipeSource(recipe);

        this.cookingRecipes.push(recipe
          // {
          //   "Name": recipe.Name,
          //   "SkillLevelReq": recipe.SkillLevelReq,
          //   "Ingredients": this.getRecipeItems(recipe.Ingredients)
          // }
        )


      }
    });

    console.log("Cooking Recipes", this.cookingRecipes);
  }

  getRecipeItems(ingredients: any[]): any {
    // "Ingredients": [
    // 	{
    // 		"ItemCode": 5109,
    // 		"StackSize": 1
    // 	},
    // 	{
    // 		"ItemCode": 5075,
    // 		"StackSize": 1
    // 	}
    // ],

    // "item_2": {
    //   "Behaviors": [
    //     {
    //       "UseVerb": "Drink",
    //       "UseAnimation": "Drink",
    //       "MetabolismCost": 15
    //     },
    //     {
    //       "UseVerb": "Empty Bottle"
    //     }
    //   ],
    //   "Description": "This bottle is full of clean, delicious water. It can be drunk to recover a little energy, and has a million other uses.",
    //   "DroppedAppearance": "LootBottle1",
    //   "IconId": 5010,
    //   "InternalName": "BottleOfWater",
    //   "Keywords": [
    //     "AlchemyIngredient",
    //     "BottledItem",
    //     "CheesemakingIngredient",
    //     "CookingIngredient",
    //     "FoodOrCookingIngredient",
    //     "GardeningRelated",
    //     "Ingredient"
    //   ],
    //   "MaxStackSize": 5,
    //   "Name": "Bottle of Water",
    //   "NumUses": 1,
    //   "Value": 11
    // },

    const shoppingList = [];

    ingredients.forEach(ingredient => {
      const code = ingredient.ItemCode;

      if (code) {

        const item = this.itemArray.find(x => x.ItemNumber === code);

        if (item) {

          shoppingList.push({ "Item": item.Item.Name, "IconId": item.Item.IconId });
        }
      }
    });

    return shoppingList;

  }

  getRecipeSource(recipe: any): any {
    const targetItem = recipe.RecipeId;

    return this.recipeSourceArray.find(r => r.RecipeNumber === targetItem);
  }

  getIconUrl(id: any): string {
    return `http://cdn.projectgorgon.com/v327/icons/icon_${id}.png`;
  }
}
