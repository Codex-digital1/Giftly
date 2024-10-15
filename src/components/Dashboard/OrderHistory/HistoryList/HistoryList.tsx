import useGetAllOrders from "../../../../Hooks/useGetAllOrders";
import TableTh from "../../../shared/TableTh";
import TableTd from "../../../shared/TableTd";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import LoadingSpinner from "../../../shared/LoadingSpinner";

interface Product {
  product_image: string[];
  product_name: string;
  total_amount: number;
  status?: string; // Add other fields as needed
}

const HistoryList: React.FC = () => {
  const [data,isLoading] = useGetAllOrders();
  if(isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="Image" />
              <TableTh tHeading="Gift Name" />
              <TableTh tHeading="Price" />
              <TableTh tHeading="Status" />
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            {data?.map((val: Product, index: number) => (
              <tr className="odd:bg-gray-50" key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <img
                    src={val.product_image[1]} // Assuming you want the second image
                    alt={val.product_name}
                    className="w-20 p-1 h-20 bg-white border mx-auto"
                  />
                </td>
                <TableTd tdHeading={val.product_name} />
                <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                  <p className="flex justify-center items-center">
                    <span>{val.total_amount}</span>
                    <FaBangladeshiTakaSign className="text-sm" />
                  </p>
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                  <div className="flex gap-1 justify-center">
                    <button className="bg-primary text-white text-sm py-1 px-2 rounded">
                      Delivered
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryList;
