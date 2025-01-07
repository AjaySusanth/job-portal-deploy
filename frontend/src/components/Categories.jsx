import { Button } from "./ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { useDispatch } from "react-redux"
import { setJobSearch } from "@/redux/jobSlice"
import { useNavigate } from "react-router-dom"

const Categories = () => {
    const categories = [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "FullStack Developer"
    ]
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSearch = (category) => {
        dispatch(setJobSearch(category))
        navigate("/browse")
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        categories.map((category, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                                <Button onClick={()=>handleSearch(category)} variant="outline" className="rounded-full">{category}</Button>
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