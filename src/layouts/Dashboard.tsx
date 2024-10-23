import { Outlet } from "react-router-dom"
import Sidebar from "../components/Dashboard/Sidebar/Sidebar"
import { Helmet } from "react-helmet-async"

const Dashboard = () => {
  return (
    <div className='relative min-h-screen md:flex  '>
       <Helmet>
        <title>Giftly | Dashboard</title>
      </Helmet>
    {/* Sidebar */}
    <Sidebar />

    {/* Outlet --> Dynamic content */}
    <div className='flex-1 md:ml-[270px] '>
      <div className='p-5'>
        <Outlet />
      </div>
    </div>
  </div>
  )
}

export default Dashboard