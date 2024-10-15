import TableTd from "../../../shared/TableTd";
import { MdBlock } from "react-icons/md";

const UserLisItem = ({ userData }: { userData: any }) => {
  const {name,email,profileImage} = userData;
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
          <button className="btn-primary"><MdBlock /> Block User</button>
        </div>
      </td>
    </tr>
  );
};

export default UserLisItem;
