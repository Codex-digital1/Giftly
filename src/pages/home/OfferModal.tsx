 
type OfferModalProps = {
    discountData:{
      coupon:string;
      description: string;
      discount: number;
      title: string; 
    }
    closeModal: () => void; // Function that returns void
  };
  const OfferModal = ({ discountData, closeModal }:OfferModalProps) => {


    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl font-bold mb-1">{discountData?.title}</h2>
          <h2 className="text-sm  mb-4">{discountData?.description}</h2>
          <p className="text-gray-700 mb-6 text-center">
            use this coupon code : 
            <span className="text-primary font-bold"> {discountData?.coupon}</span>
            
          </p>
         <div className="w-full flex justify-center items-center">
         <button 
            onClick={closeModal} 
            className="bg-primary text-white px-4 py-2 rounded-lg border   "
          >
            Close
          </button>
         </div>
        </div>
      </div>
    );
  };
  export default OfferModal;