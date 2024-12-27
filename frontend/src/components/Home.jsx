import Categories from "./Categories"
import Hero from "./Hero"
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"

const Home = () => {
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