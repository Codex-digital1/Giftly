import toast from "react-hot-toast";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const DiscountUpForm = () => {
  const axiosPublic = useAxiosPublic();
  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    const formData = new FormData(e.currentTarget); // Get form data

    // Retrieve values directly from FormData
    const coupon = formData.get('coupon') as string;
    const discount = formData.get('discount') as string;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    // Log form data or send it to the server
   const desCountInfo = {
      coupon,
      discount,
      title,
      description,
    };
    console.log(desCountInfo);
     
    axiosPublic.post('/discount', desCountInfo)
    .then((response) => {
      console.log('Response:', response.data);
      toast.success('Upload successfully')
    })
    .catch((error) => {
      console.error('Error:', error.response ? error.response.data : error.message);
      toast.success('Upload successfully')

    });
  
    


  };


  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-1/2 border p-5 space-y-3 rounded-xl text-gray-800">
        <h1 className="text-2xl font-bold text-center">Upload a New Discount Offer</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Coupon code and percentage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="space-y-1 text-sm">
              <label htmlFor="title" className="block text-gray-600">
                Coupon code
              </label>
              <input
                type="text"
                name="coupon"
                required
                placeholder="Enter the title of the offer"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="discount" className="block text-gray-600">
                Discount Percentage %
              </label>
              <input 
                type="number"
                name="discount"
                required
                placeholder="Enter the discount percentage (e.g., 20)"
                className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
              />
            </div>
          </div>
          {/* title and description input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
         
          <div className="space-y-1 text-sm">
            <label htmlFor="description" className="block text-gray-600">
              Offer Title
            </label>
            <textarea
              name="title"
              required
              placeholder="Provide a brief title of the offer"
              className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
            ></textarea>
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="description" className="block text-gray-600">
              Offer Description
            </label>
            <textarea
              name="description"
              required
              placeholder="Provide a brief description of the offer"
              className="w-full px-4 py-3 rounded-md focus:border-primary border outline-none text-gray-800 transition-all duration-200"
            ></textarea>
          </div>
          </div>
          <button type="submit" className="block w-full p-3 text-center btn-primary">
            Upload Offer
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscountUpForm;
