import TableTh from "../../../shared/TableTh"
import ManageOrdersItem from "../ManageOrdersItem/ManageOrdersItem"


const ManageOrdersList = () => {
   
  return (
    <div>
        
        <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <TableTh tHeading="Image" />
            <TableTh tHeading=" Gift Name" />
            <TableTh tHeading="Category" />
            <TableTh tHeading=" Quantity" />
            <TableTh tHeading=" Total Price" />
            <TableTh tHeading="Order Status" />
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-center">
     <ManageOrdersItem/>
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default ManageOrdersList