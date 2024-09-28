import { Link } from "react-router-dom";
import PriceDetailsIteItem from "./PriceDetailsIteItem"
import { TbShoppingBag } from "react-icons/tb";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import useAuth from "../../Provider/useAuth";

const PriceDetails = () => {
  const {cart}=useAuth() ?? {} ;
  interface CartItem {
    price: number; // Assuming price is a number
    discount: number; // Assuming discount is also a number
}
const totalPrice = cart?.reduce((accumulator: number, currentValue: CartItem) => {
  return accumulator += currentValue?.price; 
}, 0) || 0;  
const totalDiscount = cart?.reduce((accumulator: number, currentValue: CartItem) => {
  return accumulator += currentValue?.discount; 
}, 0) || 0;  

  return (
    <div className="mt-8 ">
       {/* Price Info */}
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <PriceDetailsIteItem title="Discount" price={totalDiscount || 0 }/>
      <PriceDetailsIteItem title="Delivery" price={966}/>
      <PriceDetailsIteItem title="Subtotal" price={966}/>
      <PriceDetailsIteItem title="Total" price={Math.ceil(totalPrice || 0)}/>
      
       </div>
       {/* Cupon Code */}
       <div className="max-w-3xl mx-auto">
        <p className="my-4">If You Have Promotion Code, Please Inter it here</p>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
           <div className="flex gap-[1px] items-center md:col-span-2">
           <input type="text" className="border w-full p-2  outline-none focus:border-primary rounded"/>  <button className="btn-primary py-3 px-6">Apply</button>
           </div>
          <div className="flex gap-[2px] items-center justify-end">
          <button className="btn-primary py-3 px-6">checkout</button>
          <button className="btn-primary py-[13px] px-3 "><TbShoppingBag className="text-lg"/></button>
          </div>
        </div>
        <div className="my-4 flex items-center justify-end">
        <Link to='/' className="underline">Continue Shoping</Link> <MdKeyboardDoubleArrowRight className="mt-2"/>
        </div>
       </div>
    </div>
  )
}

export default PriceDetails