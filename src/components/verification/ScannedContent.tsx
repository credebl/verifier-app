import React, { useEffect, useState } from "react";

interface ScannedContentComponentProps {
  content: string;
  step: number;
}

const ScannedContentComponent: React.FC<ScannedContentComponentProps> = ({
  content,
  step,
}) => {
  console.log("STEPS in Stepper:::", step);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const steps = 5;

    const interval = setInterval(() => {
      setActiveStep((prevStep) =>
        prevStep < steps - 1 ? prevStep + 1 : prevStep
      );
    }, 3000);

    // Clear interval after 4 steps (4 * 5 seconds = 20 seconds)
    setTimeout(() => clearInterval(interval), steps * 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-12 py-4 md:px-24 lg:px-32 z-30 bg-white sticky top-[60px] border-b border-b-slate-50">
      <div className="flex items-center justify-center">
        <div className="block">
          <div className="mt-10 text-3xl font-medium text-gray-700 dark:text-white">
            Verification Process:
          </div>
          <div className="flex items-center justify-center mt-20">
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
              {[0, 1, 2, 3, 4].map((index) => (
                <>
                  {/* <li className="mb-20 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                  <svg
                    className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </span>
                <h3 className="text-xl font-medium leading-tight">
                  Connection Established between Organization and holder
                </h3>
              </li>
              <li className="mb-20 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <svg
                    className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                  </svg>
                </span>
                <h3 className="text-xl font-medium leading-tight">
                  Proof Request is sent
                </h3>
              </li>
              <li className="mb-20 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <svg
                    className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                </span>
                <h3 className="text-xl font-medium leading-tight">
                  Holder shared proof presentation
                </h3>
              </li>
              <li className="mb-20 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
                    />
                  </svg>
                </span>
                <h3 className="text-xl font-medium leading-tight">
                  Organization received proof presentation
                </h3>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="text-[#6B7280] group-hover:text-gray-700 dark:group-hover:text-white"
                  />
                  <path
                    fill="currentColor"
                    d="M3.444 21a2.428 2.428 0 0 1-1.726-.677C1.24 19.873 1 19.33 1 18.697V6.607c0-.634.24-1.176.718-1.627a2.428 2.428 0 0 1 1.726-.677h5.134a3.486 3.486 0 0 1 1.329-1.67A3.639 3.639 0 0 1 12 2a3.64 3.64 0 0 1 2.093.633 3.486 3.486 0 0 1 1.33 1.67h5.133c.672 0 1.247.226 1.726.677.479.45.718.993.718 1.626v12.091c0 .633-.24 1.175-.718 1.627a2.428 2.428 0 0 1-1.726.676H3.444Zm-.271-2.111h17.66V6.222H3.172V18.89ZM12 5.742a.92.92 0 0 0 .657-.244.814.814 0 0 0 .26-.62.814.814 0 0 0-.26-.618.92.92 0 0 0-.657-.245.92.92 0 0 0-.657.245.814.814 0 0 0-.26.619c0 .25.087.456.26.619a.92.92 0 0 0 .657.244Z"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="none"
                    className="mr-2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#6B7280"
                      d="M3.444 21a2.428 2.428 0 0 1-1.726-.677C1.24 19.873 1 19.33 1 18.697V6.607c0-.634.24-1.176.718-1.627a2.428 2.428 0 0 1 1.726-.677h5.134a3.486 3.486 0 0 1 1.329-1.67A3.639 3.639 0 0 1 12 2a3.64 3.64 0 0 1 2.093.633 3.486 3.486 0 0 1 1.33 1.67h5.133c.672 0 1.247.226 1.726.677.479.45.718.993.718 1.626v12.091c0 .633-.24 1.175-.718 1.627a2.428 2.428 0 0 1-1.726.676H3.444Zm-.271-2.111h17.66V6.222H3.172V18.89ZM12 5.742a.92.92 0 0 0 .657-.244.814.814 0 0 0 .26-.62.814.814 0 0 0-.26-.618.92.92 0 0 0-.657-.245.92.92 0 0 0-.657.245.814.814 0 0 0-.26.619c0 .25.087.456.26.619a.92.92 0 0 0 .657.244Z"
                    />
                    <g clip-path="url(#a)">
                      <path
                        fill="#6B7280"
                        d="m16.031 20.297-.89-1.5-1.688-.375.164-1.735-1.148-1.312 1.148-1.313-.164-1.734 1.688-.375.89-1.5 1.594.68 1.594-.68.89 1.5 1.688.375-.164 1.735 1.148 1.312-1.148 1.313.164 1.734-1.688.375-.89 1.5-1.594-.68-1.594.68Zm.399-1.195 1.195-.516 1.219.516.656-1.125 1.29-.305-.118-1.313.867-.984-.867-1.008.117-1.312-1.289-.282-.68-1.125-1.195.516-1.219-.516-.656 1.125-1.29.282.118 1.312-.867 1.008.867.984-.117 1.336 1.289.282.68 1.125Zm.703-2.063 2.648-2.648-.656-.68-1.992 1.992-1.008-.984-.656.656 1.664 1.664Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M10 9.75h11.25V21H10z" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <h3 className="text-xl font-medium leading-tight">
                  Proof presentation verified
                </h3>
              </li> */}

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
                      {index < step ? (
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
                      {index === 0 &&
                        "Connection Established between Organization and Holder"}
                      {index === 1 && "Proof Request is sent to the holder"}
                      {index === 2 && "Holder shared proof presentation"}
                      {index === 3 &&
                        "Organization received proof presentation"}
                      {index === 4 && "Verification process is complete"}
                    </h3>
                  </li>
                </>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannedContentComponent;
