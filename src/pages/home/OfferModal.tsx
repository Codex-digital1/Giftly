import { TDiscountData } from "./Home";

type OfferModalProps = {
  discountData: TDiscountData;
  closeModal: () => void;
};

const OfferModal = ({ discountData, closeModal }: OfferModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative p-8 text-center">
        
        {/* Close Button (Top Right) */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>

        {/* Offer Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{discountData?.title}</h2>

        {/* Offer Description */}
        <p className="text-gray-600 mb-4 text-sm">{discountData?.description}</p>

        {/* Coupon Code Section */}
        <div className="bg-gray-100 border border-dashed border-primary p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700">
            Use this coupon code:
            <span className="block text-2xl font-bold text-primary mt-1 tracking-widest">
              {discountData?.coupon}
            </span>
          </p>
        </div>

        {/* Close Button (Bottom) */}
        <button
          onClick={closeModal}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OfferModal;
