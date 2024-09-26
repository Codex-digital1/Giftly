import { useState } from "react"
import MyModal from "../../../shared/MyModal"
import UpdateInfo from "../UpdateInfo/UpdateInfo"
import useAuth from "../../../../Provider/useAuth"

const ProfileDetails = () => {
  const [isOpen, setIsOpen] = useState(false)
  const auth = useAuth()
  // Close Modal
  const close = ()=>{
    setIsOpen(false)
  }
  return (
    <div className='max-w-xl bg-white mx-auto border rounded'>
      <div className="flex justify-center flex-col">
        <img src="https://t3.ftcdn.net/jpg/05/14/95/12/360_F_514951224_2dxMLbIw5qNRdPGD003chpbVcxWtcp7K.jpg" alt="" className='w-full rounded-t'/>

        <div className="mx-auto -translate-y-16 flex flex-col justify-center items-center">
          <div>
          <img src={auth?.user?.photoURL || ''} alt="" className='w-28 h-28 rounded-full bg-primary p-1' />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold">{auth?.user?.displayName}</h2>
            <p className="text-sm">{auth?.user?.email}</p>
            <p className="bg-primary text-white w-fit mx-auto text-xs px-2 py-[2px] rounded">Admin</p>
          <button onClick={()=> setIsOpen(true)} className="btn-primary mx-auto">Update Profile</button>
          <MyModal close={close} isOpen={isOpen}>
            <UpdateInfo/>
          </MyModal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetails