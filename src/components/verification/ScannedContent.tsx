import React from "react";

interface ScannedContentComponentProps {
  content: string;
  step: number;
}

const ScannedContentComponent: React.FC<ScannedContentComponentProps> = ({
  content,
  step,
}) => {
  return (
    <div className="px-12 py-4 md:px-24 lg:px-32 z-30 bg-white sticky top-[60px] border-b border-b-slate-50">

<div className="flex flex-row">
      <div className="flex items-center justify-start w-3/5">
        <div className="block">
          <div className="mt-10 text-3xl font-medium text-gray-700 dark:text-white">
            Verification Process:
          </div>
          <div className="flex items-center justify-center mt-20">
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
              {[1, 2, 3, 4, 5].map((index) => (
                <li
                  key={index}
                  className={`mb-20 ml-6 ${
                    index <= step ? "text-gray-700" : ""
                  }`}
                >
                  <span
                    className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
                      index <= step ? "bg-green-200" : "bg-gray-100"
                    }`}
                  >
                    {index <= step ? (
                      <svg
                        className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                    ) : null}
                  </span>
                  <h3 className="text-xl font-medium leading-tight">
                    {index === 1 && "Connection request sent to the user"}
                    {index === 2 &&
                      "Connection Established between University and user"}
                    {index === 3 &&
                      "Certificate request is being received by the user"}
                    {index === 4 &&
                      "Proof of certificate is being shared by the user"}
                    {index === 5 &&
                      "Proof of certificate is being received and getting verified by the University"}
                  </h3>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="w-2/5 p-10 flex">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Verified Details
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <div className="flex h-full flex-col justify-center gap-0 sm:p-0">
                <div className="flex border-b">
                  <div className="w-5/12 font-semibold flex truncate md:pl-1 sm:mr-8 md:mr-0 text-primary-700 dark:bg-gray-800 text-xl">
                    Attributes
                  </div>
                  <div className="w-1/12 font-semibold flex justify-start truncate md:pl-1 sm:mr-8 md:mr-0 text-primary-700 dark:bg-gray-800 text-xl"></div>
                  <div className="w-6/12 font-semibold flex truncate sm:pl-4 text-primary-700 dark:bg-gray-800 text-xl">
                    Values
                  </div>
                </div>
                <div className="flex w-full">
                  <div className={`flex w-full text-lg`}>
                    <div className="w-5/12 m-1 p-1 text-start text-gray-700 dark:text-white text-lg"></div>
                    <div className="w-1/12 m-1 p-1 flex  items-center text-gray-700 dark:text-white text-lg"></div>
                    <div className="w-6/12 m-1 truncate p-1 flex justify-start text-gray-700 dark:text-white text-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
</div>
      </div>
  );
};

export default ScannedContentComponent;
