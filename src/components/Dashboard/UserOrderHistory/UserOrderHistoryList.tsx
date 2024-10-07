import TableTh from "../../shared/TableTh";
import UserOrderHistoryListItem from "./UserOrderHistoryListItem";

const UserOrderHistoryList = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="Image" />
              <TableTh tHeading=" Gift Name" />
              <TableTh tHeading=" Price" />
              <TableTh tHeading="  Status" />
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {/* <HistoryListItem /> */}
            <UserOrderHistoryListItem />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserOrderHistoryList;
