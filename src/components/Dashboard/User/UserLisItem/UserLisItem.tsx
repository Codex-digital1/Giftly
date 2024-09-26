import TableTd from "../../../shared/TableTd";
import gitImage from "../../../../img/gift-box.png";
import { MdBlock } from "react-icons/md";

const UserLisItem = () => {
  return (
    <tr className="odd:bg-gray-50">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        <img
          src={gitImage}
          alt=""
          className="w-20 p-1 bg-white border mx-auto"
        />
      </td>
      <TableTd tdHeading="Hammad Sadi" />
      <TableTd tdHeading="hammad.sadi@yahoo.com" />

      <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
        <div className="flex gap-1 justify-center">
          <button className="btn-primary"><MdBlock/> Block User</button>
        </div>
      </td>
    </tr>
  );
};

export default UserLisItem;
