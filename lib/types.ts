import { CoreMessage } from 'ai'

export type Message = CoreMessage & {
  id: string
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
    error: string
  }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}

export interface INutritionPlan {
  plan: IDailyNutritionPlan[]
}

export interface IDailyNutritionPlan {
  day: Weekday
  meals: IMeals[]
}

export interface IItems {
  item: string
  proportion: number
  unit: 'grams' | 'kilograms' | 'count'
}

export interface IMacroNutrients {
  protein: number
  dietryFat: number
  carbohydrates: number
  water: number
}

export interface IMicroNutrients {
  vitamins: number
  dietryMinerals: number
}

export interface IMeals {
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks'
  food: String
  macros: IMacroNutrients
  micros: IMicroNutrients
  calories: number
  items: IItems[]
}

export type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type MutableAIState<AIState> = {
  get: () => AIState;
  update: (newState: AIState | ((current: AIState) => AIState)) => void;
  done: ((newState: AIState) => void) | (() => void);
};
