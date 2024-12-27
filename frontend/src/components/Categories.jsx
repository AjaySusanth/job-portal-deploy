import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"

const Categories = () => {
    const categories = [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "FullStack Developer"
    ]
    
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        categories.map((category, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                                <Button variant="outline" className="rounded-full">{category}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
export default Categories