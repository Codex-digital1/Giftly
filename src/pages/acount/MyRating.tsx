import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAuth from '../../Provider/useAuth';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import RatingGiftCard from '../../components/Rating/RatingGiftCard';

const MyRating = () => {
  const { allGifts, loading } = useAuth()

  console.log(allGifts)
  return (
    <div className="p-5 border-t-4 border-primary bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">My Rating & Reviews</h2>

      <div className=''>
        <Tabs>
          <TabList className="flex gap-8 border-b-2 mb-4 items-center justify-center">
            <Tab className="px-4 py-2 text-lg font-medium cursor-pointer transition duration-200 hover:bg-gray-100 focus:outline-none active-tab" selectedClassName="border-b-4 border-primary text-primary">
              Not Reviewed
            </Tab>
            <Tab className="px-4 py-2 text-lg font-medium cursor-pointer transition duration-200 hover:bg-gray-100 focus:outline-none" selectedClassName="border-b-4 border-primary text-primary">
              Reviewed
            </Tab>
          </TabList>

          {
            loading ? <LoadingSpinner smallHeight={true} /> : <TabPanel className="grid grid-cols-1 gap-10">
              {/* <h2 className="text-lg font-medium">Product Reviews</h2>
            <p className="text-gray-600">You haven't reviewed any products yet.</p> */}
              {
                allGifts?.filter((gift) => gift.rating === 0).length > 0 ? (
                  allGifts.filter((gift) => gift.rating === 0).map((singleGift, index) => {
                    return <RatingGiftCard key={index} singleGift={singleGift} />
                  })
                ) : (
                  <p className="text-gray-600">No gifts are waiting for a review.</p>
                )
              }

            </TabPanel>
          }

          {
            loading ? <LoadingSpinner smallHeight={true} /> : <TabPanel className="grid grid-cols-1 gap-10">
              {/* <h2 className="text-lg font-medium">Product Reviews</h2>
            <p className="text-gray-600">You haven't reviewed any products yet.</p> */}
              {
                allGifts?.filter((gift) => gift.rating !== 0).length > 0 ? (
                  allGifts.filter((gift) => gift.rating !== 0).map((singleGift, index) => {
                    return <RatingGiftCard key={index} singleGift={singleGift} />
                  })
                ) : (
                  <p className="text-gray-600">You haven't reviewed any services yet.</p>
                )
              }

            </TabPanel>
          }
        </Tabs>
      </div>
    </div>
  );
};

export default MyRating;
