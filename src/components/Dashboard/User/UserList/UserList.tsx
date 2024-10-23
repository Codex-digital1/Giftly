import LoadingSpinner from "../../../shared/LoadingSpinner";
import TableTh from "../../../shared/TableTh";
import UserLisItem from "../UserLisItem/UserLisItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// User interface
interface User {
  _id: string;
  image: string;
  name: string;
  email: string;
}



const UserList = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["getUsers"],
    queryFn: async (): Promise<any> => {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/getUsers`
      );
      return response;
    },
  });

  console.log("user data", data);

  if (isLoading) return <LoadingSpinner />;

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
            {data?.data?.map((val: User) => (
              <UserLisItem key={val._id} userData={val} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
