import { useEffect, useState } from 'react'

interface IProps {
  show: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  title: string;
}

const SuccessPopup = ({ show, onSubmit, onCancel, title }: IProps) => {
  const [showPopup, setShowPopup] = useState(show);

  useEffect(() => {
    setShowPopup(show);
  }, [show])
  return (
    <div>
      <div
        id="popup-modal"
        tabIndex={-1}
        className={`${showPopup ? "flex" : "hidden"} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-0rem)] max-h-full`}
      >
        <div className='bg-overlay w-full h-full absolute'></div>
        <div className="section-from-top relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={() => {
                onCancel()
                setShowPopup(false)
              }}
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
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="p-4 rounded-xl mx-auto mb-4 text-green-400 bg-green-50 w-24 h-24 dark:text-green-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>


              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {title}
              </h3>
              
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="btn-hover text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ms-4"
                onClick={() => {
                  onCancel()
                  setShowPopup(false)
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default SuccessPopup