import { GoPlusCircle } from "react-icons/go";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../carousel";
// import Macros from "./macros";
import { Card, CardContent } from "../card";
import DashboardCardWrapper from "./dashboard.wrapper";
import Macros from "./macros";

interface MealsProps {
  available: boolean
}

function MealsNotAvailable() {
  return (
    <div className="flex justify-center">press + to enter manually or install our App</div>
  )
}

export default function Meals({ available }: MealsProps) {
  return (
    <>
      <DashboardCardWrapper showFooter={true} showAddButton={true} icon={<GoPlusCircle />} headerTitle={"Nutrition"} footerText={"movement so far"}>
        {available ? <div className="md:flex hidden gap-x-2">
          <Macros />
          <Macros />
          {/* TODO: Add section for Micros */}
        </div>

          : <MealsNotAvailable />}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-sm md:hidden"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DashboardCardWrapper>
    </>

  )
}
