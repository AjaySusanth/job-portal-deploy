import useGetAllJobs from "@/hooks/useGetAllJobs"
import Categories from "./Categories"
import Hero from "./Hero"
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Categories/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}
export default Home