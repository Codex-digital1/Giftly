import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import useAuth from "../../Provider/useAuth";
import GiftCard from "../../components/shared/GiftCard";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import InfiniteScroll from "react-infinite-scroller";
import { GiftType } from "../../types/Types";
import { ImSpinner10 } from "react-icons/im";

const Allgift = () => {
  const axiosPublic = useAxiosPublic();
  const {
    handleFilterChange,
    allGifts,
    loading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useAuth() ?? {};
  const [categories, setCategories] = useState<string[]>([]);
  const fetchCategories = async () => {
    try {
      const response = await axiosPublic.get("/api/gifts/categories");
      setCategories(response?.data?.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="container mx-auto mt-20 p-4 min-h-[calc(100vh-530px)]">
        <Helmet>
          <title>Giftly-AllGift</title>
        </Helmet>
        <div className="my-4">
          <h3 className="text-2xl font-bold mb-2">Pick Your Gift!</h3>
          <img
            className="w-full"
            src="https://i.ibb.co.com/PNKhv3G/birthday-gifts.jpg"
            alt=""
          />
        </div>
        {/* Filters Section */}
        <div id="all-gift-container" className="my-5">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
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
                <option value="">All Products</option>
                {categories?.map((category: string, i: number) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
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
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-primary focus:border-primary"
                />
                <input
                  name="priceMax"
                  type="number"
                  onChange={handleFilterChange}
                  placeholder="Max Price"
                  className="border rounded-md p-2 w-full focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
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
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
                className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
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
          {loading && (
            <LoadingSpinner large={true} card={false} smallHeight={false} />
          )}
          <InfiniteScroll
            pageStart={0}
            // @ts-ignore
            loadMore={fetchNextPage}
            hasMore={hasNextPage || false}
            loader={
              <div className="text-center my-10" key={0}>
                Loading...
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {allGifts &&
                allGifts?.length > 0 &&
                allGifts?.map((gift: GiftType) => (
                  <GiftCard key={gift?._id} gift={gift} />
                ))}
            </div>
            {isFetchingNextPage && (
              <div>
                <ImSpinner10 className="animate-spin mx-auto text-5xl text-primary text-center my-10" />
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default Allgift;
