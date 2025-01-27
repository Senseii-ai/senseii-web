import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../carousel";
import DashboardCardWrapper from "./dashboard.wrapper";
import Macros from "./macros";
import { IconPlus } from "../icons/icons";

interface MealsProps {
  available: boolean
}

function MealsNotAvailable() {
  return (
    <div className="flex justify-center items-center h-full">press + to enter manually or install our App</div>
  )
}

export default function Meals({ available }: MealsProps) {
  return (
    <DashboardCardWrapper showFooter={true} showAddButton={true} icon={<IconPlus />} headerTitle={"Nutrition"} footerText={"movement so far"}>
      {available ?
        <div className="w-10/12 mx-auto">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full md:w-full xs:max-w-[300px] mx-auto"
          >
            <CarouselContent className="">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="xl:basis-1/2">
                  <Macros />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        : <MealsNotAvailable />}
    </DashboardCardWrapper>
  )
}
