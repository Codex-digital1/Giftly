import { Link } from "react-router-dom";
 import eroor from '../../../src/img/eroor.svg'
const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
         <img src={eroor} alt="" />
        <p className="text-xl text-gray-700 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-md text-gray-500 mt-2">
          It might have been removed or the URL might be incorrect.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-primary text-white text-lg rounded-lg  transition-colors"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
