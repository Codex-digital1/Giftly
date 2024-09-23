import React from 'react'
import { FaCartPlus } from 'react-icons/fa6'
import { IoSearchOutline } from 'react-icons/io5'

export default function () {
  return (
    <div className="min-w-[270px] group w-full text-center border-2 border-[#EBEBEB] rounded relative overflow-hidden shadow-sm">
            <div className=" h-[270px]">
              <img
                src="/Feature-products-img/img1.jpg"
                alt=""
                className="w-full h-full group-hover:scale-110  transition-all duration-300 ease-in-out "
              />
            </div>

            <div className="mt-4 mb-2">
              <h3 className="text-sm font-semibold uppercase text-[#333333] group-hover:opacity-0  transition-all duration-300 ease-in-out">
                Rose Bouquet
              </h3>
              <p className="text-primary text-xl font-semibold group-hover:opacity-0  transition-all duration-300 ease-in-out">
                $20
              </p>
            </div>

            {/* New */}
            <span className="bg-primary text-white absolute w-[130px] h-[30px] top-[15px] -left-10 -rotate-45 z-10">
              New
            </span>

            {/* Sale */}
            <span className="bg-primary text-white absolute w-[130px] h-[30px] top-[15px] -right-10 rotate-45 z-10">
              Sale
            </span>

            {/* Hover add to cart and search buttons */}
            <div
              className="absolute top-[30%] left-0 w-full h-full  flex items-center justify-center opacity-0 
 group-hover:opacity-100 transition-all duration-300 ease-in-out
"
            >
              <div className="flex flex-col gap-5 items-center">
                <div className="flex gap-2">
                  <span className="bg-[#F1C40F] flex items-center justify-center h-6 w-6 border-2 border-black"></span>
                  <span className="bg-[#A0D468] flex items-center justify-center h-6 w-6 border-2 border-black"></span>
                </div>

                <div className="flex text-white gap-3">
                  <div className="btn-primary">
                    <span>
                      <FaCartPlus />
                    </span>
                    <span>Add to cart</span>
                  </div>
                  <div className="btn-primary">
                    <IoSearchOutline />
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}
