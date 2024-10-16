// import { Link } from "react-router-dom";
// import PriceDetailsIteItem from "./PriceDetailsIteItem";
// import { TbShoppingBag } from "react-icons/tb";
// import { MdKeyboardDoubleArrowRight } from "react-icons/md";
// import useAuth from "../../Provider/useAuth";
// import { useState } from "react";

// const PriceDetails = () => {
//   const {cart,removeToCart}=useAuth()
//   const totalPrice=cart.reduce((accumulator:number, currentValue:object,) => {
//     // return updated accumulator
//    return accumulator+=currentValue?.price
//   }, 0);
//   const totalDiscount=cart.reduce((accumulator:number, currentValue:object,) => {
//     // return updated accumulator
//    return accumulator+=currentValue?.discount
//   }, 0);
//   return (
//     <div className="mt-8 ">
//        {/* Price Info */}
//        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//       <PriceDetailsIteItem title="Discount" price={totalDiscount}/>
//       <PriceDetailsIteItem title="Delivery" price={966}/>
//       <PriceDetailsIteItem title="Subtotal" price={966}/>
//       <PriceDetailsIteItem title="Total" price={Math.ceil(totalPrice)}/>
      
//        </div>
//        {/* Cupon Code */}
//        <div className="max-w-3xl mx-auto">
//         <p className="my-4">If You Have Promotion Code, Please Inter it here</p>
//         <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
//            <div className="flex gap-[1px] items-center md:col-span-2">
//            <input type="text" className="border w-full p-2  outline-none focus:border-primary rounded"/>  <button className="btn-primary py-3 px-6">Apply</button>
//            </div>
//           <div className="flex gap-[2px] items-center justify-end">
//           <button className="btn-primary py-3 px-6">checkout</button>
//           <button className="btn-primary py-[13px] px-3 "><TbShoppingBag className="text-lg"/></button>
       
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PriceDetails;
