 
type OfferModalProps = {
    title: string;
    description: string;
    closeModal: () => void; // Function that returns void
  };
  const OfferModal = ({ title, description, closeModal }:OfferModalProps) => {
    // Split the description into parts
    const parts = description.split("WELCOME20");
  
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <p className="text-gray-700 mb-6 text-center">
            {parts[0]} 
            <span className="text-primary font-bold">WELCOME20</span>
            {parts[1]}
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