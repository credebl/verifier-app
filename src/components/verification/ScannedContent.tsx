import React, { useEffect, useState } from "react";

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
      <div className="flex items-center justify-center">
        <div className="block">
          <div className="mt-10 text-3xl font-medium text-gray-700 dark:text-white">
            Verification Process:
          </div>
          <div className="flex items-center justify-center mt-20">
            <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
              {[1, 2, 3, 4, 5].map((index) => (
                <>
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
                      {index === 1 &&
                        "Connection request sent to the user"}
                      {index === 2 &&
                        "Connection Established between University and user"}
                      {index === 3 && "Certificate request is being received by the user"}
                      {index === 4 && "Proof of certificate is being shared by the user"}
                      {index === 5 &&
                        "Proof of certificate is being received and getting verified by the University"}
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
