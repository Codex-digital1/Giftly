import { useState } from "react"
import MyModal from "../../../shared/MyModal"
import TableTh from "../../../shared/TableTh"
import GiftListItem from "../GiftListItem/GiftListItem"
import GiftAddForm from "../Form/GiftAddForm"
import GiftUpdateForm from "../Form/GiftUpdateForm"

const GiftList = () => {
    const [gitAddModal, setGiftAddModal] = useState<boolean>(false)
    const [updateGitAddModal, setUpdateGiftAddModal] = useState<boolean>(false)

    // Close Add Modal
    const closeGiftAddModal = ()=>{
        setGiftAddModal(false)
    }
    // Close Gift Update Modal
    const closeUpdateGiftAddModal = ()=>{
        setUpdateGiftAddModal(false)
    }
  return (
    <div>
        <div className="flex justify-end mb-4">
            <button onClick={()=> setGiftAddModal(true)} className="btn-primary">Add New Gift</button>
            {/* Add Gift Modal */}
            <MyModal isOpen={gitAddModal}  close={closeGiftAddModal} isLarge={true}>
                <GiftAddForm/>
            </MyModal>
            {/* Update Gift Modal */}
            <MyModal isOpen={updateGitAddModal}  close={closeUpdateGiftAddModal} isLarge={true}>
              <GiftUpdateForm/>
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
      <GiftListItem setUpdateGiftAddModal={setUpdateGiftAddModal}/>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default GiftList