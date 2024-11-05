export const testPlan = {
  plan: [
    {
      day: 'Monday',
      meals: [
        {
          type: 'Breakfast',
          food: 'Oatmeal with Berries',
          macros: {
            protein: 10,
            dietryFat: 5,
            carbohydrates: 45,
            water: 200
          },
          micros: {
            vitamins: 20,
            dietryMinerals: 15
          },
          calories: 300,
          items: [
            { item: 'Oats', proportion: 40, unit: 'grams' },
            { item: 'Berries', proportion: 50, unit: 'grams' },
            { item: 'Milk', proportion: 200, unit: 'ml' }
          ]
        },
        {
          type: 'Lunch',
          food: 'Grilled Chicken Salad',
          macros: {
            protein: 25,
            dietryFat: 15,
            carbohydrates: 20,
            water: 300
          },
          micros: {
            vitamins: 35,
            dietryMinerals: 25
          },
          calories: 400,
          items: [
            { item: 'Chicken Breast', proportion: 150, unit: 'grams' },
            { item: 'Mixed Greens', proportion: 100, unit: 'grams' },
            { item: 'Olive Oil', proportion: 15, unit: 'ml' }
          ]
        },
        {
          type: 'Dinner',
          food: 'Baked Salmon with Quinoa',
          macros: {
            protein: 30,
            dietryFat: 15,
            carbohydrates: 40,
            water: 250
          },
          micros: {
            vitamins: 25,
            dietryMinerals: 20
          },
          calories: 500,
          items: [
            { item: 'Salmon', proportion: 150, unit: 'grams' },
            { item: 'Quinoa', proportion: 50, unit: 'grams' },
            { item: 'Broccoli', proportion: 100, unit: 'grams' }
          ]
        },
        {
          type: 'Snacks',
          food: 'Greek Yogurt with Nuts',
          macros: {
            protein: 10,
            dietryFat: 15,
            carbohydrates: 20,
            water: 150
          },
          micros: {
            vitamins: 10,
            dietryMinerals: 15
          },
          calories: 300,
          items: [
            { item: 'Greek Yogurt', proportion: 150, unit: 'grams' },
            { item: 'Mixed Nuts', proportion: 30, unit: 'grams' }
          ]
        }
      ]
    },
    {
      day: 'Tuesday',
      meals: [
        {
          type: 'Breakfast',
          food: 'Smoothie Bowl',
          macros: {
            protein: 15,
            dietryFat: 10,
            carbohydrates: 40,
            water: 250
          },
          micros: {
            vitamins: 20,
            dietryMinerals: 15
          },
          calories: 350,
          items: [
            { item: 'Banana', proportion: 1, unit: 'count' },
            { item: 'Spinach', proportion: 50, unit: 'grams' },
            { item: 'Almond Milk', proportion: 200, unit: 'ml' }
          ]
        },
        {
          type: 'Lunch',
          food: 'Vegetable Stir-fry with Tofu',
          macros: {
            protein: 20,
            dietryFat: 10,
            carbohydrates: 50,
            water: 200
          },
          micros: {
            vitamins: 30,
            dietryMinerals: 20
          },
          calories: 400,
          items: [
            { item: 'Tofu', proportion: 100, unit: 'grams' },
            { item: 'Mixed Vegetables', proportion: 200, unit: 'grams' },
            { item: 'Soy Sauce', proportion: 15, unit: 'ml' }
          ]
        },
        {
          type: 'Dinner',
          food: 'Whole Wheat Pasta with Marinara Sauce',
          macros: {
            protein: 15,
            dietryFat: 10,
            carbohydrates: 60,
            water: 200
          },
          micros: {
            vitamins: 20,
            dietryMinerals: 15
          },
          calories: 450,
          items: [
            { item: 'Whole Wheat Pasta', proportion: 80, unit: 'grams' },
            { item: 'Marinara Sauce', proportion: 100, unit: 'grams' },
            { item: 'Parmesan Cheese', proportion: 20, unit: 'grams' }
          ]
        },
        {
          type: 'Snacks',
          food: 'Fresh Fruit',
          macros: {
            protein: 2,
            dietryFat: 0,
            carbohydrates: 20,
            water: 150
          },
          micros: {
            vitamins: 10,
            dietryMinerals: 10
          },
          calories: 100,
          items: [
            { item: 'Apple', proportion: 1, unit: 'count' },
            { item: 'Orange', proportion: 1, unit: 'count' }
          ]
        }
      ]
    },
    {
      day: 'Wednesday',
      meals: [
        {
          type: 'Breakfast',
          food: 'Scrambled Eggs with Avocado',
          macros: {
            protein: 15,
            dietryFat: 20,
            carbohydrates: 5,
            water: 100
          },
          micros: {
            vitamins: 15,
            dietryMinerals: 10
          },
          calories: 300,
          items: [
            { item: 'Eggs', proportion: 2, unit: 'count' },
            { item: 'Avocado', proportion: 1, unit: 'count' }
          ]
        },
        {
          type: 'Lunch',
          food: 'Turkey Sandwich',
          macros: {
            protein: 20,
            dietryFat: 10,
            carbohydrates: 40,
            water: 150
          },
          micros: {
            vitamins: 20,
            dietryMinerals: 15
          },
          calories: 350,
          items: [
            { item: 'Whole Wheat Bread', proportion: 2, unit: 'slices' },
            { item: 'Turkey Breast', proportion: 100, unit: 'grams' },
            { item: 'Lettuce', proportion: 30, unit: 'grams' }
          ]
        },
        {
          type: 'Dinner',
          food: 'Lentil Soup with Bread',
          macros: {
            protein: 15,
            dietryFat: 10,
            carbohydrates: 50,
            water: 300
          },
          micros: {
            vitamins: 25,
            dietryMinerals: 15
          },
          calories: 450,
          items: [
            { item: 'Lentils', proportion: 100, unit: 'grams' },
            { item: 'Vegetable Broth', proportion: 200, unit: 'ml' },
            { item: 'Whole Grain Bread', proportion: 1, unit: 'slice' }
          ]
        },
        {
          type: 'Snacks',
          food: 'Hummus with Carrot Sticks',
          macros: {
            protein: 5,
            dietryFat: 10,
            carbohydrates: 15,
            water: 100
          },
          micros: {
            vitamins: 10,
            dietryMinerals: 5
          },
          calories: 150,
          items: [
            { item: 'Hummus', proportion: 50, unit: 'grams' },
            { item: 'Carrots', proportion: 100, unit: 'grams' }
          ]
        }
      ]
    },
    {
      day: 'Thursday',
      meals: [
        {
          type: 'Breakfast',
          food: 'Greek Yogurt with Granola and Honey',
          macros: {
            protein: 15,
            dietryFat: 5,
            carbohydrates: 30,
            water: 150
          },
          micros: {
            vitamins: 15,
            dietryMinerals: 10
          },
          calories: 250,
          items: [
            { item: 'Greek Yogurt', proportion: 150, unit: 'grams' },
            { item: 'Granola', proportion: 30, unit: 'grams' },
            { item: 'Honey', proportion: 10, unit: 'grams' }
          ]
        },
        {
          type: 'Lunch',
          food: 'Quinoa Salad with Beans and Corn',
          macros: {
            protein: 20,
            dietryFat: 10,
            carbohydrates: 45,
            water: 200
          },
          micros: {
            vitamins: 25,
            dietryMinerals: 20
          },
          calories: 350,
          items: [
            { item: 'Quinoa', proportion: 60, unit: 'grams' },
            { item: 'Black Beans', proportion: 100, unit: 'grams' },
            { item: 'Corn', proportion: 50, unit: 'grams' }
          ]
        },
        {
          type: 'Dinner',
          food: 'Chicken Stir-fry with Brown Rice',
          macros: {
            protein: 25,
            dietryFat: 10,
            carbohydrates: 50,
            water: 250
          },
          micros: {
            vitamins: 25,
            dietryMinerals: 20
          },
          calories: 450,
          items: [
            { item: 'Chicken Breast', proportion: 150, unit: 'grams' },
            { item: 'Brown Rice', proportion: 100, unit: 'grams' },
            { item: 'Mixed Vegetables', proportion: 200, unit: 'grams' }
          ]
        },
        {
          type: 'Snacks',
          food: 'Nuts and Seeds Mix',
          macros: {
            protein: 10,
            dietryFat: 15,
            carbohydrates: 10,
            water: 50
          },
          micros: {
            vitamins: 10,
            dietryMinerals: 10
          },
          calories: 200,
          items: [{ item: 'Nuts and Seeds', proportion: 40, unit: 'grams' }]
        }
      ]
    },
    {
      day: 'Friday',
      meals: [
        {
          type: 'Breakfast',
          food: 'Fruit Smoothie with Protein Powder',
          macros: {
            protein: 20,
            dietryFat: 5,
            carbohydrates: 45,
            water: 300
          },
          micros: {
            vitamins: 20,
            dietryMinerals: 15
          },
          calories: 350,
          items: [
            { item: 'Banana', proportion: 1, unit: 'count' },
            { item: 'Berries', proportion: 50, unit: 'grams' },
            { item: 'Protein Powder', proportion: 25, unit: 'grams' }
          ]
        },
        {
          type: 'Lunch',
          food: 'Grilled Veggie Wrap',
          macros: {
            protein: 15,
            dietryFat: 10,
            carbohydrates: 50,
            water: 200
          },
          micros: {
            vitamins: 25,
            dietryMinerals: 15
          },
          calories: 350,
          items: [
            { item: 'Whole Wheat Wrap', proportion: 1, unit: 'count' },
            {
              item: 'Grilled Vegetables',
              proportion: 150,
              unit: 'grams'
            },
            { item: 'Hummus', proportion: 30, unit: 'grams' }
          ]
        },
        {
          type: 'Dinner',
          food: 'Spaghetti with Turkey Meatballs',
          macros: {
            protein: 20,
            dietryFat: 15,
            carbohydrates: 55,
            water: 200
          },
          micros: {
            vitamins: 20,
            dietryMinerals: 15
          },
          calories: 450,
          items: [
            { item: 'Spaghetti', proportion: 80, unit: 'grams' },
            { item: 'Turkey Meatballs', proportion: 100, unit: 'grams' },
            { item: 'Marinara Sauce', proportion: 100, unit: 'grams' }
          ]
        },
        {
          type: 'Snacks',
          food: 'Edamame',
          macros: {
            protein: 10,
            dietryFat: 5,
            carbohydrates: 15,
            water: 100
          },
          micros: {
            vitamins: 10,
            dietryMinerals: 10
          },
          calories: 150,
          items: [{ item: 'Edamame', proportion: 100, unit: 'grams' }]
        }
      ]
    },
    {
      day: 'Saturday',
      meals: [
        {
          type: 'Breakfast',
          food: 'Avocado Toast with Egg',
          macros: {
            protein: 10,
            dietryFat: 20,
            carbohydrates: 25,
            water: 100
          },
          micros: {
            vitamins: 15,
            dietryMinerals: 10
          },
          calories: 250,
          items: [
            { item: 'Whole Wheat Bread', proportion: 2, unit: 'slices' },
            { item: 'Avocado', proportion: 1, unit: 'count' },
            { item: 'Egg', proportion: 1, unit: 'count' }
          ]
        },
        {
          type: 'Lunch',
          food: 'Tuna Salad',
          macros: {
            protein: 25,
            dietryFat: 10,
            carbohydrates: 10,
            water: 200
          },
          micros: {
            vitamins: 20,
            dietryMinerals: 15
          },
          calories: 300,
          items: [
            { item: 'Canned Tuna', proportion: 150, unit: 'grams' },
            { item: 'Mixed Greens', proportion: 100, unit: 'grams' },
            { item: 'Olive Oil', proportion: 15, unit: 'ml' }
          ]
        },
        {
          type: 'Dinner',
          food: 'Baked Cod with Vegetables',
          macros: {
            protein: 25,
            dietryFat: 10,
            carbohydrates: 20,
            water: 200
          },
          micros: {
            vitamins: 25,
            dietryMinerals: 20
          },
          calories: 350,
          items: [
            { item: 'Cod', proportion: 150, unit: 'grams' },
            { item: 'Vegetables', proportion: 150, unit: 'grams' },
            { item: 'Lemon Juice', proportion: 15, unit: 'ml' }
          ]
        },
        {
          type: 'Snacks',
          food: 'Trail Mix',
          macros: {
            protein: 10,
            dietryFat: 15,
            carbohydrates: 20,
            water: 50
          },
          micros: {
            vitamins: 15,
            dietryMinerals: 10
          },
          calories: 200,
          items: [{ item: 'Trail Mix', proportion: 40, unit: 'grams' }]
        }
      ]
    },
    {
      day: 'Sunday',
      meals: [
        {
          type: 'Breakfast',
          food: 'Pancakes with Maple Syrup',
          macros: {
            protein: 8,
            dietryFat: 8,
            carbohydrates: 40,
            water: 100
          },
          micros: {
            vitamins: 15,
            dietryMinerals: 10
          },
          calories: 200,
          items: [{ item: 'Trail Mix', proportion: 40, unit: 'grams' }]
        }
      ]
    }
  ]
}
