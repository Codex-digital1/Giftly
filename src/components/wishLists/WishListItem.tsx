import gitImage from '../../img/g3.jpg'
import useAuth from '../../Provider/useAuth';
import TableTd from '../shared/TableTd';
import TableTh from '../shared/TableTh';
import WishList from './../../pages/wishList/WishList';
const WishListItem = () => {
  const {wishlist ,addToCart,removeToWishlist}=useAuth()

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

         {wishlist.map(list=>(<tbody 
         key={list?._id}
         className="divide-y divide-gray-200 text-center">
            <tr className="odd:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                <img
                  src={list?.giftImage[0]}
                  alt=""
                  className="w-20 p-1 bg-white border mx-auto"
                />
              </td>
              <TableTd tdHeading={list?.giftName}/>
              <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                {list?.price}<span className='text-lg'>৳</span>
              </td>
             
              <TableTd tdHeading={list?.availability}/>
              <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                <div className='flex gap-4 justify-center'>
                  <div onClick={()=>addToCart(list)} className="btn-primary">
                    <span>Add to Cart</span>
                  </div>
                  <div onClick={()=>removeToWishlist(list)} className="btn-primary">
                    <span>Remove</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>))}
        </table>
        {
          wishlist?.length === 0 && <center className=" my-4 text-xl font-semibold">Your wishlist is empty. Start adding items to see them here!</center>
        }
      </div>
    </div>
  );
}

export default WishListItem