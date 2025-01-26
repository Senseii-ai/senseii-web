import { Card, CardContent, CardHeader } from '~/components/ui/card'
import { Pencil1Icon } from '@radix-ui/react-icons'
import {
  IBasicInformation,
  IConstraints,
  IDietPreferences,
  IEatingHabits,
  IHealthGoals,
  ILifeStyle,
} from '@senseii/types'
import { Separator } from '../separator'
import { toast } from '~/hooks/use-toast'

const dummyLifeStyle: ILifeStyle = {
  dailyRoutine: 'moderate',
  exerciseRoutine: [
    {
      exerciseType: 'cardio',
      frequency: 'daily'
    },
    {
      exerciseType: 'strength',
      frequency: 'weekly'
    }
  ]
}

const dummyDietPreferences: IDietPreferences = {
  preference: 'omnivore',
  allergies: ['peanuts', 'shellfish'],
  intolerances: ['lactose'],
  dislikedFood: ['brussels sprouts'],
  favouriteFood: ['pizza', 'salmon', 'berries']
}

const dummyHealthGoals: IHealthGoals = {
  weightGoal: 'loss',
  specificNutritionGoal: 'Increase protein intake',
  medicalConditions: 'Type 2 diabetes'
}

const dummyEatingHabits: IEatingHabits = {
  mealsPerDay: 3,
  mealComplexity: 'moderate',
  cookingTime: '30-60 minutes'
}

const dummyConstraints: IConstraints = {
  financial: {
    budget: 500,
    budgetType: 'monthly'
  },
  geographical: {
    location: 'Urban'
  }
}

const dummyBasicInformation: IBasicInformation = {
  age: 30,
  weight: {
    unit: 'Kilograms',
    value: 75,
  },
  height: {
    value: 180,
    unit: 'Centimeters'
  },
  gender: 'Male'
}

export default function UserPreference() {

  return (
    <div>
      <Card className="h-full">
        <CardHeader>
          <div className="flex justify-between">
            <h4 className="font-semibold text-lg">Information</h4>
            <Pencil1Icon
              onClick={() => toast({ title: 'not supported yet' })}
              width={20}
              height={20}
            />
          </div>
        </CardHeader>
        <CardContent className="">
          <div className="p-4 flex flex-col gap-y-4">
            <BasicInfoCard />
            <LifeStyleCard />
            <DietPreferencesCard />
            <EatingHabitsCard />
            <ConstraintsCard />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ConstraintsCard() {
  const { financial, geographical } = dummyConstraints
  return (
    <div className='border-b-4'>
      <div className='text-lg mb-2'>Constraints</div>
      <div className='flex flex-col'>
        <div className='flex justify-between py-4'>
          <h5>Financial</h5>
          <h5>{financial.budget}, {financial.budgetType}</h5>
        </div>
        <Separator />
        <div className='flex justify-between py-4'>
          <h5>Geographical</h5>
          <h5>{geographical.location}</h5>
        </div>
      </div>
    </div>
  )
}

function EatingHabitsCard() {
  const infoArray = Object.entries(dummyEatingHabits)
  return (
    <div className='border-b-4'>
      <div className='text-lg mb-2'>Eating Habits</div>
      {infoArray.map(([itemKey, value], index) => {
        return (
          <div key={itemKey} >
            <div className='flex justify-between py-4'>
              <h5>{itemKey[0].toUpperCase() + itemKey.slice(1)}</h5>
              <h5>{value}</h5>
            </div>
            {index < infoArray.length - 1 ? <Separator /> : ""}
          </div>
        )
      })}
    </div>
  )
}

function DietPreferencesCard() {
  const infoArray = Object.entries(dummyDietPreferences)
  return (
    <div className='border-b-4'>
      <div className='text-lg mb-2'>Diet Preferences</div>
      {infoArray.map(([itemKey, value], index) => {
        return (
          <div key={itemKey} >
            <div className='flex justify-between py-4'>
              <h5>{itemKey[0].toUpperCase() + itemKey.slice(1)}</h5>
              <div>{typeof value === "object" ? <h5>{value.join(", ")}</h5> : <h5>{value}</h5>}</div>
            </div>
            {index < infoArray.length - 1 ? <Separator /> : ""}
          </div>
        )
      })}
      <Separator />
    </div>
  )
}

function LifeStyleCard() {
  const infoArray = Object.entries(dummyLifeStyle)
  return (
    <div className='border-b-4'>
      <div className='text-lg my-2'>Life Style</div>
      {infoArray.map(([itemKey, value], index) => {
        return (
          <div key={itemKey}>
            <div className='flex justify-between items-center py-4'>
              <h5>{itemKey.charAt(0).toUpperCase() + itemKey.slice(1)}</h5>
              <div>{typeof value === "object" && value != null ? <h5>{value.map((item, index) => (
                <div className='flex justify-end' key={index}>
                  <h5>
                    {item.exerciseType}, {item.frequency}
                  </h5>
                </div>))}
              </h5>
                :
                <h5>
                  {value}
                </h5>}
              </div>
            </div>
            {index < infoArray.length - 1 ? <Separator /> : <Separator />}
          </div>
        )
      })}
    </div>
  )
}

function BasicInfoCard() {
  const infoArray = Object.entries(dummyBasicInformation)
  return (
    <div className='border-b-4'>
      <div className='text-lg mb-2'>Basic Information</div>
      {infoArray.map(([itemKey, value], index) => {
        return (
          <div key={itemKey} >
            <div className='flex justify-between py-4'>
              <h5>{itemKey[0].toUpperCase() + itemKey.slice(1)}</h5>
              <div>{typeof value === "object" && value != null ? <h5>{value.value}, {value.unit}</h5> : <h5>{value}</h5>}</div>
            </div>
            {index < infoArray.length - 1 ? <Separator /> : ""}
          </div>
        )
      })}
    </div>
  )
}
