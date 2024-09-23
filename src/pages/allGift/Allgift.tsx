import { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroller";
import Card from "./card";

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
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [category, setCategory] = useState("All");
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState(false);
  const [sortOption, setSortOption] = useState("default");

  // Function to filter gifts based on state
  const filterGifts = (gifts) => {
    return gifts
      .filter((gift) => category === "All" || gift.category === category)
      .filter(
        (gift) => gift.price >= priceRange[0] && gift.price <= priceRange[1]
      )
      .filter((gift) => gift.rating >= rating)
      .filter((gift) => (availability ? gift.available : true))
      .sort((a, b) => {
        if (sortOption === "price-low-high") return a.price - b.price;
        if (sortOption === "price-high-low") return b.price - a.price;
        if (sortOption === "popularity") return b.rating - a.rating; // Assuming rating as popularity
        if (sortOption === "newest") return b.id - a.id; // Assuming higher id is newer
        return 0; // Default sorting
      });
  };

  const filteredGifts = filterGifts(giftsData);

  return (
    <>
      <div className="container mx-auto mt-20 p-4 min-h-[calc(100vh-530px)]">
        <div className="my-4">
            <h3 className="text-2xl font-bold mb-2">Pick Your Gift!
            </h3>
            <img className="w-full" src="https://i.ibb.co.com/PNKhv3G/birthday-gifts.jpg" alt="" />
        </div>
        {/* Filters Section */}
        <div className="my-8">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mb-8">
            {/* Category Filter */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="For Him">Gifts for Him</option>
                <option value="For Her">Gifts for Her</option>
                <option value="Tech Gifts">Tech Gifts</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Price Range
              </label>
              <input
                type="range"
                min={0}
                max={5000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <p className="mt-2 text-lg text-gray-600">
                Price: ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Customer Rating
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                onChange={(e) => setRating(Number(e.target.value))}
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
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={availability}
                  onChange={(e) => setAvailability(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-500">
                  Only Show Available Gifts
                </span>
              </label>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="popularity">Popularity</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          {/* card container */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
          <Card/>

          </div>
        </div>
      </div>
    </>
  );
};

export default Allgift;
