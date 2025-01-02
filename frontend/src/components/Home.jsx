import useGetAllJobs from "@/hooks/useGetAllJobs"
import Categories from "./Categories"
import Hero from "./Hero"
import LatestJobs from "./LatestJobs"
import Footer from "./shared/Footer"
import Navbar from "./shared/Navbar"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
  useGetAllJobs();
  const navigate = useNavigate()
  const {user} = useSelector(store=>store.auth)

  useEffect(()=>{
    if(user?.role == 'recruiter') {
      navigate("/admin/companies")
    }
  })
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