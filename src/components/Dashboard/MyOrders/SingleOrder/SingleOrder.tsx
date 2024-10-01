import { Link } from "react-router-dom";
import giftImg from "../../../../img/g3.jpg";
import { FaArrowRightLong } from "react-icons/fa6";

const SingleOrder = () => {
  const isCompleted = false;
  return (
    <div className="border rounded">
      <img src={giftImg} alt="" />
      <div className="py-2 px-4 text-center space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">
          Lorem ipsum dolor sit.
        </h2>
        <h4 className="text-xl font-bold">454 ৳</h4>
        {isCompleted ? (
          <button className="border border-primary text-primary py-1 px-2 rounded">
            Completed
          </button>
        ) : (
          <Link to="/" className="inline-block">
            <button className="btn-primary">
              Track My Order <FaArrowRightLong />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleOrder;
