import Swal from "sweetalert2";
import TableTd from "../../../shared/TableTd";
import { MdBlock } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

type UserResponse = {
  id: string;
  email: string;
  role: string
  // Add any other properties your API response returns for a user
}[];

const UserLisItem = ({ userData,refetch }: { userData: any,refetch : any }) => {

  const { name, email, profileImage, role } = userData;
  const axiosPublic = useAxiosPublic()


  const { mutateAsync } = useMutation({
    mutationFn: async (email : {email : string}) => {
      const res = await axiosPublic.patch(`/manage-users/${email}`);
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Success!",
        text: "Role has been changed.",
        icon: "success"
      });
    refetch()
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  
    const sweetAlert =  (email : {email : string}) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to make this user an admin?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!"
      }).then(async (result) => {
        if (result.isConfirmed) {
          await mutateAsync(email)// Trigger the mutation with the user's email
        
        }
      });
    };
  




  return (
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        <img
          src={profileImage}
          alt=""
          className="w-20 p-1 h-20 bg-white border mx-auto"
        />
      </td>
      <TableTd tdHeading={name} />
      <TableTd tdHeading={email} />

      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <div className="flex gap-1 justify-center">
          {role === "user" && (
            <button
              onClick={() => sweetAlert(userData?.email)} // Pass the email directly
              className="btn-primary"
            >
              <MdBlock /> User
            </button>
          )}
          {role === "admin" && (
            <button className="btn-admin">
              <MdBlock /> Admin
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UserLisItem;
