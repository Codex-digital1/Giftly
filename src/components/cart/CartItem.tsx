import React, { useState, useEffect, useRef } from "react";
import TableTd from "../shared/TableTd";
import TableTh from "../shared/TableTh";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import useAuth from "../../Provider/useAuth";
import PriceDetailsIteItem from "./PriceDetailsIteItem";
import { LuMoveRight } from "react-icons/lu";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
type DiscountData = {
  title: string;
  description: string;
  coupon: string;
  discount:number;
  dis:number;
  
};
const CartItem = () => {
  const axiosPublic = useAxiosPublic();
  const { cart, removeToCart,user } = useAuth() ?? {};
  // console.log(cart?.[0]?._id,'cart');
  // State for cart totals
  const [subTotal, setSubTotal] = useState(0);
  const shipping = 70; 
 const productId = cart?.[0]?._id;
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
    // Shedule Delevery State  
  const [sheduleDate, setSheduleDate] = useState<string>("");
  const [sheduleDelevery, setSheduleDelevery] = useState<boolean>(false);
  const [discountData, setDiscountData] = useState<DiscountData | null>(null);
 
  const discountCode = discountData?.coupon;
 const dis = discountData?.discount ?? 0 ;
  // Calculate subtotal dynamically based on cart items
  useEffect(() => {
    const calculatedSubtotal = cart?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0;
    setSubTotal(calculatedSubtotal);
  }, [cart]);
  
  // Update total when subtotal, shipping, or discount changes
  useEffect(() => {
    setTotal(subTotal + shipping - discount);
  }, [subTotal, shipping, discount]);
  const couponRef = useRef<HTMLInputElement>(null);


  // Coupon
  useEffect(() => {

    // Fetch discount data
    axiosPublic.get("/getDiscountData")
      .then(res => {
        setDiscountData(res.data.data?.[0]);
      })
      .catch(error => {
        console.log(error);  
      });
  }, []);

  const handleApplyCoupon = () => {
    const couponValue = couponRef.current?.value; 
    if (couponValue === discountCode) {
      const discountAmount = (subTotal * dis) / 100; 
      const newTotal = subTotal - discountAmount;  
      toast.success('Coupon applied');
      setDiscount(newTotal); // Update the discount state with the new total
    } else {
      toast.error('Coupon code invalid');
      console.log('Coupon code invalid');
    }
  };
  const handleSheduledDelevery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSheduleDelevery(e.target.checked);
  };

  const handleUserData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Accessing the correct fields based on the 'name' attribute
    const firstName = (form.elements.namedItem('first_name') as HTMLInputElement)?.value;
    const lastName = (form.elements.namedItem('last_name') as HTMLInputElement)?.value;
    const number = (form.elements.namedItem('phone') as HTMLInputElement)?.value;
    const address = (form.elements.namedItem('address') as HTMLInputElement)?.value;
    const email = user?.email;
    const name = `${firstName} ${lastName}`;
  
    // Prepare the data to be sent in the POST request
    const paymentDetails = {
      name,
      email,
      number,
      address,
      productId,
      sheduleDate,
    };
    // console.log(paymentDetails);
  
    // Sending the POST request using Axios
    axiosPublic
      .post('/order', paymentDetails)
      .then((response) => {
        console.log(response?.data?.url);
        window.location.replace(response?.data?.url);
        console.log('Payment details sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error in sending payment details:', error);
      });
  };
  

  return (
    <div className="flex gap-x-5">
      <div className="overflow-x-auto col-span-8 flex-1">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <TableTh tHeading="Image" />
              <TableTh tHeading="Gift Name" />
              <TableTh tHeading="Quantity" />
              <TableTh tHeading="Stock Status" />
              <TableTh tHeading="Price" />
              <TableTh tHeading="Action" />
            </tr>
          </thead>
          {cart?.map((item) => (
            <tbody key={item?._id} className="divide-y divide-gray-200 text-center">
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
                      defaultValue={item?.quantity || 1}
                      className="w-7 h-[33px] bg-slate-100 pl-2 outline-none"
                      readOnly
                    />

                    <button className="hover:bg-primary border transition-all duration-200 hover:border-primary text-gray-800 hover:text-white w-8 h-8 flex justify-center items-center ">
                      <span className="text-lg -mt-[6px]">-</span>
                    </button>
                  </div>
                </td>
                <TableTd tdHeading={item?.availability ? "Available" : "Not Available"} />
                <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                  <p className="flex gap-1 justify-center items-center">
                    <span>{item?.price}</span>
                    <FaBangladeshiTakaSign className="text-sm" />
                  </p>
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-base font-medium text-gray-800">
                  <div className="flex gap-1 justify-center">
                    <div onClick={() => removeToCart?.(item)} className="btn-primary">
                      <span>Remove</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {cart?.length === 0 && (
          <center className=" my-4 text-xl font-semibold">
            Your cart is empty. Start adding items to see them here!
          </center>
        )}
      </div>
      {/* Form */}
      <div>
        <div className="bg-white p-4 rounded-xl border-l-2 border-primary">
          <div>
            <form onSubmit={handleUserData} className="space-y-2">
              {/* User details form */}
              <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-sm">
                            <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="first_name">
                                 First Name
                            </label>
                           <input
                                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                                id="first_name"
                                placeholder="Enter first name"
                                name="first_name"
                                type="text"
                            />
                        </div>
                        <div className="space-y-2 text-sm">
                            <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="last_name">
                                Last Name
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                                id="last_name"
                                placeholder="Enter last name"
                                name="last_name"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="email">
                            Phone
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                            placeholder="Enter your phone"
                            name="phone"
                            type="text"
                        />
                    </div>
                    <div className="space-y-2 text-sm mt-2">
                        <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="email">
                            Full address
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2  focus-visible:outline-none dark:border-zinc-700"
                            placeholder="Enter your Address"
                            name="address"
                            type="text"
                        />
                    </div>
              <hr className="mt-4 mb-4" />

              {/* Dynamic price details */}
              <PriceDetailsIteItem title="Subtotal" price={subTotal} />
              <PriceDetailsIteItem title="Shipping" price={shipping} />
              <PriceDetailsIteItem title="Discount" price={discount} />
              <PriceDetailsIteItem title="Total" price={total} />

              {/* Coupon input */}
              <div className="flex gap-[1px] items-center md:col-span-2 mt-2">
              <input
          type="text"
          placeholder="Enter your code here"
          className="border w-full p-2 outline-none focus:border-primary rounded"
          ref={couponRef} 
        />
        <button type="button" className="btn-primary py-3 px-6" onClick={handleApplyCoupon}>
          Apply
        </button>
              </div>
              {/* Sheadule delevary feature */}
              <div className="max-w-[300px] space-y-2">
                    <div className="inline-flex items-center">
                      <label
                        className="flex items-center cursor-pointer relative"
                        htmlFor="check-2"
                      >
                        <input
                          type="checkbox"
                          // checked
                          onChange={handleSheduledDelevery}
                          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-primary checked:border-primary"
                          id="check-2"
                        />
                        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            stroke-width="1"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <label
                        className="cursor-pointer ml-2 text-black text-sm md:text-base"
                        htmlFor="check-2"
                      >
                        Make Sheduled Delevery
                      </label>
                    </div>
                    {/* DAte INput */}
                    {sheduleDelevery && (
                      <div className="space-y-1 text-sm">
                        <label htmlFor="date" className="block text-black">
                          Select Shedule Date
                        </label>
                        <input
                          type="date"
                          name="date"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSheduleDate(e.target.value)
                          }
                          id="date"
                          className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
                        />
                      </div>
                    )}
                  </div>

              {/* Checkout button */}
              <button className="w-full border p-2 flex justify-center items-center gap-x-4 bg-primary text-white">
                Proceed to checkout <LuMoveRight className="mt-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
