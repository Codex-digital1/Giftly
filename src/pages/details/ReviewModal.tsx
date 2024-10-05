import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface ReviewModalProps {
  isVisible: boolean;
  onClose: (visible: boolean) => void;
  handleReview: (rating: number, comment: string) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isVisible, onClose, handleReview }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');

  if (!isVisible) return null; // Modal won't be visible if 'isVisible' is false

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedRating === null) {
      toast.error('Please select a rating');
      return;
    }
    handleReview(selectedRating, comment); // Pass selected rating and comment to handleReview
    setSelectedRating(null); // Reset after submission
    // setComment(''); // Reset comment after submission
    onClose(false); // Close the modal
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating); // Set the clicked rating as selected
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-xl max-w-lg w-full shadow-lg">
        <h2 className="text-3xl text-center mb-4 font-great-vibes">Your opinion matters!</h2>
        <form onSubmit={handleSubmit}> {/* Updated form to trigger handleReview on submit */}
          <div className="flex flex-col items-center py-6 space-y-3">
            <span className="text-center">How was your experience?</span>

            <div className="flex space-x-3">
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleRatingClick(index + 1)} // Set the rating on click
                  title={`Rate ${index + 1} stars`}
                  aria-label={`Rate ${index + 1} stars`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-10 h-10 ${index + 1 <= (selectedRating || 0) ? 'text-yellow-400' : 'text-gray-400'}`} // Update color based on selectedRating
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)} // Update comment state
            rows={3}
            placeholder="Message..."
            className="w-full p-4 rounded-md resize-none text-gray-800 border-2 border-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-gray-50"
          ></textarea>

          <div className="grid place-content-center">
            <button type="submit" className="mt-6 text-white btn-secondary">
              Leave feedback
            </button>
          </div>
        </form>

        <button
          onClick={() => onClose(false)}
          className="mt-4 text-sm text-center text-gray-600 w-full hover:text-primary duration-300 transition-all"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
