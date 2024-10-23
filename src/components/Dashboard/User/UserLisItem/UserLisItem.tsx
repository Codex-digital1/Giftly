import Swal from "sweetalert2";
import TableTd from "../../../shared/TableTd";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
import useAuth from "../../../../Provider/useAuth";

// type UserResponse = {
//   id: string;
//   email: string;
//   role: string
//   // Add any other properties your API response returns for a user
// }[];

const UserLisItem = ({ userData, refetch }: { userData: any, refetch: any }) => {
  const { user } = useAuth() || {};
  const { name, email, profileImage, role } = userData;
  const axiosPublic = useAxiosPublic()
  // console.log(role)

  const { mutateAsync } = useMutation({
    mutationFn: async ({ email, role }: { email: string, role: string }) => {
      console.log(role)
      const res = await axiosPublic.patch(`/manage-users/${email}`, role);
      return res.data;
    },
    onSuccess: () => {
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


  // const sweetAlert = (email: { email: string }, e: { e: string }) => {
  //   console.log(e)
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "Do you want to make this user an admin?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes!"
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       // await mutateAsync(email)// Trigger the mutation with the user's email
  //       console.log("click")
  //     }
  //   });
  // };

  const sweetAlert = (email: string, role: string) => {
    console.log(`Role: ${role}`);
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change this user to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync({ email, role })
        // Trigger the mutation with the user's email
        console.log("Role changed:", role);
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

      {/* <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
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
      </td> */}

      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <div className="space-y-1 text-sm">
          <select
            disabled={email === user?.email}
            defaultValue={role}
            name="role"
            onChange={(e) => sweetAlert(userData?.email, e.target.value)} // Pass email and role as strings
            className="px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
          >
            <option value="admin">ADMIN</option>
            <option value="user">USER</option>
          </select>
        </div>
      </td>
    </tr>
  );
};

export default UserLisItem;
