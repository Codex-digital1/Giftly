import LoadingSpinner from "../../../shared/LoadingSpinner";
import TableTh from "../../../shared/TableTh";
import UserLisItem from "../UserLisItem/UserLisItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface User {
  _id: string;
  image: string;
  name: string;
  email: string;
}

interface UserResponse {
  data: User[];
  error: boolean;
  success: boolean;
  message: string;
}

const UserList = () => {
  const { data, isLoading,refetch } = useQuery<UserResponse>({
    queryKey: ["allUsers"],
    queryFn: async (): Promise<UserResponse> => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/allUsers`
      );
      return res.data;
    },
  });

  
  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  
  // console.log(data?.data);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="Image" />
              <TableTh tHeading=" Name" />
              <TableTh tHeading="Email" />
              <TableTh tHeading="  Action" />
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {data?.data?.map((val: User) => {
              return <UserLisItem key={val._id} userData={val} refetch={refetch} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
