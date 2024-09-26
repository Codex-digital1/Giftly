import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroller";
import Card from "./card";
import axios from "axios";
import GiftCard from "../../components/shared/GiftCard";
import useAuth from "../../Provider/useAuth";

const giftsData = [
  {
    id: 1,
    name: "Gift A",
    category: "For Him",
    price: 50,
    rating: 4,
    available: true,
  },
  {
    id: 2,
    name: "Gift B",
    category: "Tech Gifts",
    price: 150,
    rating: 5,
    available: false,
  },
  {
    id: 3,
    name: "Gift C",
    category: "For Her",
    price: 80,
    rating: 3,
    available: true,
  },
  // Add more gift objects
];

const Allgift = () => {
  const { handleFilterChange,allGifts,gifts, filters } = useAuth();
console.log(allGifts.map(i=>i.category));
const giftCategory=[...new Set(gifts?.map(gift=>gift?.category))]

  return (
    <>
      <div className="container mx-auto mt-20 p-4 min-h-[calc(100vh-530px)]">
        <div className="my-4">
          <h3 className="text-2xl font-bold mb-2">Pick Your Gift!</h3>
          <img
            className="w-full"
            src="https://i.ibb.co.com/PNKhv3G/birthday-gifts.jpg"
            alt=""
          />
        </div>
        {/* Filters Section */}
        <div id="all-gift-container" className="my-8">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mb-8">
            {/* Category Filter */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                name="category"
                onChange={handleFilterChange}
              >
                {
                  giftCategory?.map((category,i)=><option key={i} value={category}>{category}</option>)
                }
                {/* <option value="All">All</option>
                <option value="For Him">Gifts for Him</option>
                <option value="For Her">Gifts for Her</option>
                <option value="Tech Gifts">Tech Gifts</option> */}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex space-x-4">
                <input
                  name="priceMin"
                  type="number"
                  onChange={handleFilterChange}
                  placeholder="Min Price"
                  className="border rounded-md p-2 w-full"
                />
                <input
                  name="priceMax"
                  type="number"
                  onChange={handleFilterChange}
                  placeholder="Max Price"
                  className="border rounded-md p-2 w-full"
                />
              </div>
              {/* <input
                type="range"
                min={0}
                max={5000}
                name="price"
                value={filters?.priceMin}
                onChange={handleFilterChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              /> */}
              {/* <p className="mt-2 text-lg text-gray-600">
                Price: ${filters?.priceMin} - ${filters?.priceMax}
              </p> */}
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Customer Rating
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                onChange={handleFilterChange}
                name="rating"
              >
                <option value={0}>All Ratings</option>
                <option value={4}>4 stars & up</option>
                <option value={3}>3 stars & up</option>
                <option value={2}>2 stars & up</option>
                <option value={1}>1 star & up</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Availability
              </label>
              <select
                name="availability"
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="In Stock">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                name="sortBy"
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={handleFilterChange}
              >
                <option value="default">Default</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="popularity">Popularity</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          {/* card container */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {allGifts?.length > 0 &&
              allGifts?.map((gift) => <GiftCard key={gift?._id} gift={gift} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Allgift;
