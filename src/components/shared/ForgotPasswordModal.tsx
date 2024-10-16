import React, { Fragment, FormEvent } from "react";
import {
  Dialog,
  Transition,
} from "@headlessui/react";

interface ForgotPasswordModalProps {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  handleResetPassword: (e: FormEvent) => void; // Accept event as parameter
  email: string;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  setIsOpen,
  isOpen,
  handleResetPassword,
  email,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    handleResetPassword(e); // Call the reset function
    setIsOpen(false); // Close the modal after submission
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4  text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <form onSubmit={handleSubmit}
              className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Panel >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium text-center leading-6 text-gray-900"
                  >
                    Reset Password
                  </Dialog.Title>
                  <div className="space-y-6 mt-4">
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb-2 text-start text-sm"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={email}
                          placeholder="Enter Your Email Here"
                          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#dd8c89] bg-gray-200 text-gray-900"
                          data-temp-mail-org="0"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="mt-8" />
                  <div className="mt-2">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      Send
                    </button>
                  </div>
                </Dialog.Panel>
              </form>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ForgotPasswordModal;
