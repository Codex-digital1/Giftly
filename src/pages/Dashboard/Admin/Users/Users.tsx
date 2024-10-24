import { Helmet } from "react-helmet-async"
import UserList from "../../../../components/Dashboard/User/UserList/UserList"
import SectionHeading from "../../../../components/shared/SectionHeading"

const Users = () => {
   
  return (
    <div>
       <Helmet>
        <title>Giftly-Manage-users</title>
      </Helmet>
       <SectionHeading title="Users List"/>
       <UserList/>
    </div>
  )
}

export default Users