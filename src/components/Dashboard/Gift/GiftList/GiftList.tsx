import { useState } from "react"
import MyModal from "../../../shared/MyModal"
import TableTh from "../../../shared/TableTh"
import GiftListItem from "../GiftListItem/GiftListItem"
import GiftAddForm from "../Form/GiftAddForm"
import GiftUpdateForm from "../Form/GiftUpdateForm"
import LoadingSpinner from "../../../shared/LoadingSpinner"
import useAuth from "../../../../Provider/useAuth"
import { GiftType } from "../../../../types/Types"

const GiftList = () => {
  const {loading,refetch} = useAuth() ?? {};
 
    const [gitAddModal, setGiftAddModal] = useState<boolean>(false)
    const [updateGitAddModal, setUpdateGiftAddModal] = useState<boolean>(false)
    const [selectedGift, setSelectedGift] = useState<GiftType>();

    // Close Add Modal
    const closeGiftAddModal = ()=>{
        setGiftAddModal(false)
        refetch?.()
      }
      // Close Gift Update Modal
      const closeUpdateGiftAddModal = ()=>{
        setUpdateGiftAddModal(false)
        refetch?.()
    }
  return (
    <div>
        <div className="flex justify-end mb-4 ">
            <button onClick={()=> setGiftAddModal(true)} className="btn-primary p-3">Add New Gift</button>
            {/* Add Gift Modal */}
            <MyModal 
            isOpen={gitAddModal}  
            close={closeGiftAddModal} 
            isLarge={true}>
            <GiftAddForm closeGiftAddModal={closeGiftAddModal}/>
            </MyModal>
            {/* Update Gift Modal */}
            <MyModal isOpen={updateGitAddModal}  close={closeUpdateGiftAddModal} isLarge={true}>
              <GiftUpdateForm closeUpdateGiftAddModal={closeUpdateGiftAddModal} gift={selectedGift||null}/>
            </MyModal>
        </div>
        <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <TableTh tHeading="Image" />
            <TableTh tHeading=" Gift Name" />
            <TableTh tHeading="Category" />
            <TableTh tHeading=" Stock Status" />
            <TableTh tHeading=" Price" />
            <TableTh tHeading="  Action" />
          </tr>
        </thead>
        

        <tbody className="divide-y divide-gray-200 text-center">
      <GiftListItem   
      setUpdateGiftAddModal={setUpdateGiftAddModal}  
      setSelectedGift={setSelectedGift}       
      />
        </tbody>
      </table>
      {loading && <div className="flex justify-center items-center ">
        <LoadingSpinner card={true} large={false} smallHeight={false} />
        </div>}
    </div>
    </div>
  )
}

export default GiftList