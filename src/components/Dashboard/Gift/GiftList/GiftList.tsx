import { useState } from "react";
import MyModal from "../../../shared/MyModal";
import TableTh from "../../../shared/TableTh";
import TableTd from "../../../shared/TableTd";
import GiftAddForm from "../Form/GiftAddForm";
import GiftUpdateForm from "../Form/GiftUpdateForm";
// import LoadingSpinner from "../../../shared/LoadingSpinner";
import useAuth from "../../../../Provider/useAuth";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import { GiftType } from "../../../../types/Types";
// import toast from "react-hot-toast";
import Swal from "sweetalert2";
import InfiniteScroll from "react-infinite-scroller";
import { FaBangladeshiTakaSign, FaTrash, FaRegPenToSquare } from "react-icons/fa6";
import { ImSpinner10 } from "react-icons/im";

const GiftList = () => {
  const axiosPublic = useAxiosPublic();
  const {
    allGifts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useAuth() ?? {};

  const [giftAddModal, setGiftAddModal] = useState<boolean>(false);
  const [updateGiftModal, setUpdateGiftModal] = useState<boolean>(false);
  const [selectedGift, setSelectedGift] = useState<GiftType | null>(null);

  // Close Add Modal
  const closeGiftAddModal = () => {
    setGiftAddModal(false);
    refetch?.();
  };

  // Close Update Modal
  const closeUpdateGiftModal = () => {
    setUpdateGiftModal(false);
    refetch?.();
  };

  // Handle delete a gift
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(`/gifts/delete/${id}`);
          if (response.data.success) {
            refetch?.();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error("Error deleting gift:", error);
        }
      }
    });
  };

  return (
    <div>
      {/* Add and Update Modals */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setGiftAddModal(true)}
          className="btn-primary p-3"
        >
          Add New Gift
        </button>
        <MyModal isOpen={giftAddModal} close={closeGiftAddModal} isLarge={true}>
          <GiftAddForm closeGiftAddModal={closeGiftAddModal} />
        </MyModal>
        <MyModal isOpen={updateGiftModal} close={closeUpdateGiftModal} isLarge={true}>
          <GiftUpdateForm
            closeUpdateGiftAddModal={closeUpdateGiftModal}
            gift={selectedGift}
          />
        </MyModal>
      </div>

      {/* Gift List Table */}
      <div className="overflow-x-auto">
            <InfiniteScroll
              pageStart={0}
              // @ts-ignore
              loadMore={fetchNextPage}
              hasMore={hasNextPage || false}
              loader={
                <div className="text-center my-10" key={0}>
                  Loading...
                </div>
              }
            >
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="Image" />
              <TableTh tHeading="Gift Name" />
              <TableTh tHeading="Category" />
              <TableTh tHeading="Stock Status" />
              <TableTh tHeading="Price" />
              <TableTh tHeading="Action" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
              {allGifts &&
                allGifts?.length > 0 &&
                allGifts?.map((gift: GiftType) => (
                  <tr key={gift._id} className="odd:bg-gray-50 w-full">
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      <img
                        src={gift?.giftImage[0]}
                        alt="Gift"
                        className="w-20 p-1 bg-white border mx-auto"
                      />
                    </td>
                    <TableTd tdHeading={gift?.giftName} />
                    <TableTd tdHeading={gift?.category || ""} />
                    <td className="whitespace-nowrap px-4 py-2">
                      <span
                        className={`rounded-3xl px-3 py-1 ${
                          gift?.availability === "In Stock"
                            ? "bg-green-300"
                            : gift?.availability === "Out of Stock"
                            ? "bg-red-300"
                            : "bg-gray-300"
                        }`}
                      >
                        {gift?.availability}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <div className="flex justify-center items-center">
                        <span>{gift?.price}</span>
                        <FaBangladeshiTakaSign className="ml-1 text-sm" />
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => handleDelete(gift._id)}
                        className="btn-primary text-white bg-red-500"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => {
                          setUpdateGiftModal(true);
                          setSelectedGift(gift);
                        }}
                        className="btn-primary text-white bg-green-500"
                      >
                        <FaRegPenToSquare />
                      </button>
                    </td>
                  </tr>
                ))}
              {isFetchingNextPage && (
                <tr>
                  <td colSpan={6}>
                    <ImSpinner10 className="animate-spin mx-auto text-5xl text-primary my-10" />
                  </td>
                </tr>
              )}
          </tbody>
        </table>
            </InfiniteScroll>
        {/* {loading && (
          <div className="flex justify-center items-center">
            <LoadingSpinner card={true} large={false} smallHeight={false} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default GiftList;
