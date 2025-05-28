import useGetAllOrders from "../../../../Hooks/useGetAllOrders";
import { TOrder } from "../../../../types/Types";
import TableTh from "../../../shared/TableTh";

const HistoryList: React.FC = () => {
  const [data, ] = useGetAllOrders();
  // if (isLoading) return <LoadingSpinner></LoadingSpinner>
  console.log('order history',data)
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="Transaction id" />
              <TableTh tHeading="Order status" />
              <TableTh tHeading="Total price" />
              <TableTh tHeading="CreatedAt" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-center">
            {data?.map((val: TOrder, index: number) => (
              <tr className="odd:bg-gray-50" key={index}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {
                    val?.tran_id ? (
                      <span className="text-blue-500 hover:underline">
                        {val?.tran_id}
                      </span>
                    ) : (
                      <span className="text-red-500">N/A</span>
                    )
                  }
                </td>
                
                <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                  <p className="flex gap-1 justify-center whitespace-nowrap text-base font-medium text-gray-800">
                    <span
                       className={`rounded-3xl px-3 py-1 ${
                        val?.order_status === 'Pending'
                          ? 'bg-yellow-300'
                          : val?.order_status === 'Processing'
                          ? 'bg-blue-300'
                          : val?.order_status === 'Shipping'
                          ? 'bg-orange-400'
                          : val?.order_status === 'Delivered'
                          ? 'bg-green-300'
                          : 'bg-gray-300'
                      }`}
                    >
                      {val?.order_status}
                    </span>
                  </p>


                </td>
                <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                  {val?.total_amount ?? 0}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                  {new Date(val?.createdAt).toLocaleDateString() ?? 'Not Available'}
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
