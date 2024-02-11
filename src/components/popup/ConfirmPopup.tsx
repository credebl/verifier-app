import { useEffect, useState } from 'react'

interface IProps {
  show: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  title: string;
}

const ConfirmPopup = ({ show, onSubmit, onCancel, title = "Are you sure you want to proceed?" }: IProps) => {
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="p-4 rounded-xl mx-auto mb-4 text-orange-400 bg-orange-50 w-24 h-24 dark:text-orange-200">
                <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>

              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {title}
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="btn-hover text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-4"
                onClick={() => onSubmit()}
              >
                Allow
              </button>
              <button
                onClick={() => {
                  onCancel()
                  setShowPopup(false)
                }}
                data-modal-hide="popup-modal"
                type="button"
                className="btn-hover text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ConfirmPopup