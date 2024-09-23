import gitImage from '../../img/g3.jpg'
import TableTd from '../shared/TableTd';
import TableTh from '../shared/TableTh';
const WishListItem = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr >
              <TableTh tHeading='Image'/>
              <TableTh tHeading=' Gift Name'/>
              <TableTh tHeading=' Price'/>
              <TableTh tHeading='  Stock Status'/>
              <TableTh tHeading='  Action'/>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-center">
            <tr className="odd:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                <img
                  src={gitImage}
                  alt=""
                  className="w-20 p-1 bg-white border mx-auto"
                />
              </td>
              <TableTd tdHeading='Showpiece'/>
              <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                670<span className='text-lg'>৳</span>
              </td>
             
              <TableTd tdHeading='  In Stock'/>
              <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                <div className='flex gap-1 justify-center'>
                  <div className="btn-primary">
                    <span>Add to Cart</span>
                  </div>
                  <div className="btn-primary">
                    <span>Remove</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WishListItem