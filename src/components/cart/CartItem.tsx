import TableTd from "../shared/TableTd"
import TableTh from "../shared/TableTh"
import gitImage from '../../img/gift-box.png'
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../../Provider/useAuth";
const CartItem = () => {
  const {cart,removeToCart}=useAuth()
  const totalPrice=cart.reduce((accumulator, currentValue,) => {
    // return updated accumulator
    accumulator+=currentValue?.price
  }, 0);
  const totalDiscount=cart.reduce((accumulator, currentValue,) => {
    // return updated accumulator
    accumulator+=currentValue?.discount
  }, 0);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <TableTh tHeading="Image" />
            <TableTh tHeading=" Gift Name" />
            <TableTh tHeading="Quantity" />
            <TableTh tHeading=" Stock Status" />
            <TableTh tHeading=" Price" />
            <TableTh tHeading="  Action" />
          </tr>
        </thead>
        
          {cart.map(item=> <tbody
          key={item?._id} className="divide-y divide-gray-200 text-center">
          <tr className="odd:bg-gray-50">
            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              <img
                src={item?.giftImage[0]}
                alt=""
                className="w-20 p-1 bg-white border mx-auto"
              />
            </td>
            <TableTd tdHeading={item?.giftName} />
            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
              <div className="flex items-center justify-center">
              <button className="hover:bg-primary border hover:border-primary text-gray-800 transition-all duration-200 hover:text-white w-8 h-8 flex justify-center items-center ">
                  <span className="text-lg -mt-[6px]">+</span>
                </button>
               
                <input
                  type="text"
                  defaultValue={9}
                  className="w-7 h-[33px] bg-slate-100 pl-2 outline-none"
                  readOnly
                />
             <button className="hover:bg-primary border transition-all duration-200 hover:border-primary text-gray-800 hover:text-white w-8 h-8 flex justify-center items-center ">
                  <span className="text-lg -mt-[6px]">-</span>
                </button>
              </div>
            </td>
            <TableTd tdHeading={item?.availability} />
            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
           <p className="flex gap-1 justify-center items-center">
           <span>{item?.price} </span> <FaBangladeshiTakaSign className='text-sm'/>
           </p>
            </td>

            <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
              <div className="flex gap-1 justify-center">
                <div onClick={()=>removeToCart({id:item?._id,giftName:item?.giftName})} className="btn-primary">
                  <span>Remove</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>)}
       
      </table>
      {
          cart.length === 0 && <center className=" my-4 text-xl font-semibold">Your cart is empty. Start adding items to see them here!</center>
        }
    </div>
  );
}

export default CartItem