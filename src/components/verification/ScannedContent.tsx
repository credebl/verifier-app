import React, { useEffect, useState } from "react";
import { Attributes } from "../../../common/common.constants";

interface ScannedContentComponentProps {
  verifiedData: any;
  content: string;
  step: number;
}

const ScannedContentComponent: React.FC<ScannedContentComponentProps> = ({
  verifiedData,
  content,
  step,
}) => {
  const proofData = [
    {
      [`${Attributes.SL_NO}`]: "",
    },
    {
      [`${Attributes.STUDENT_NAME}`]: "",
    },
    {
      [`${Attributes.UNIVERSITY_NAME}`]: "",
    },
    {
      [`${Attributes.CURRENT_SEMESTER_PERFORMANCE_SGA}`]: "",
    },
    {
      [`${Attributes.CUMMULATIVE_SEMESTER_PERFORMANCE_SGA}`]: "",
    },
  ];
  const [data, setData] = useState(proofData);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  console.log("verifiedData00", verifiedData);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData([
        {
          [`${Attributes.SL_NO}`]: "ertyu",
        },
        {
          [`${Attributes.STUDENT_NAME}`]: "rthjk",
        },
        {
          [`${Attributes.UNIVERSITY_NAME}`]: "fghjk",
        },
        {
          [`${Attributes.CURRENT_SEMESTER_PERFORMANCE_SGA}`]: "dfghj",
        },
        {
          [`${Attributes.CUMMULATIVE_SEMESTER_PERFORMANCE_SGA}`]: "dfghj",
        },
      ]);
      setVerified(true);
    }, 5000);
  }, []);

  const proofDetailsData =
    data?.length &&
    data.map((items: any) => {
      delete items.credDefId;
      delete items.schemaId;

      return Object.entries(items).map(([key, value]) => {
        return {
          name: key,
          value,
        };
      })[0];
    });

  console.log("proofDetailsData::", proofDetailsData);
  return (
    <div className="px-12 py-4 md:px-24 lg:px-32 z-30 sticky top-[60px] border-b-slate-50 z-0">
      <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
        <a
          href="/"
          type="button"
          className="text-white bg-blue-700 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary"
        >
          Verify another
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex items-center justify-start">
          <div className="block">
            <div className="mt-10 text-3xl font-medium text-gray-700 dark:text-white">
              Verification Progress:
            </div>
            <div className="flex items-center justify-center my-20">
              <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {[1, 2, 3, 4, 5].map((index) => (
                  <li
                    key={index}
                    className={`mb-20 last:-mb-4 ml-6 ${
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
                      {index === 1 && "Connection request sent to the student"}
                      {index === 2 && "Making secure connection with student"}
                      {index === 3 &&
                        "Certificate being requested from the student"}
                      {index === 4 &&
                        "Proof of certificate is received from the student"}
                      {index === 5 && "Verifying the claims of the certificate"}
                    </h3>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="p-10 flex w-full">
          <div className="relative p-4 w-full max-h-full">
            <div className="bg-gradient-to-r from-primary to-secondary relative rounded-lg shadow-xl border border-gray-200 dark:bg-gray-700 ">
              {verified && (
                <div className="flex justify-end mr-14 absolute -top-[83px] -right-[110px]">
                  <img
                    src="/pngtree-verified-stamp-png-image_9168723.png"
                    className="w-40 h-40 mt-4"
                  />
                </div>
              )}
              <div className="p-4 md:p-5 space-y-3">
                <div className="flex h-full flex-col justify-center gap-0 sm:p-0">
                  <div className="flex border-b">
                    <div className="w-8/12 font-semibold flex truncate md:pl-1 sm:mr-8 md:mr-0 text-white dark:bg-gray-800 text-2xl mb-4 mt-0">
                      Verified Data
                    </div>
                    <div className="w-4/12 font-semibold flex truncate sm:pl-4 text-primary-700 dark:bg-gray-800 text-xl">
                      <a className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 mb-4 mt-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 20 20"
                          className="mt-[6px] ml-3 dark:text-white text-primary-700"
                        >
                          <path
                            fill="currentColor"
                            d="M9.168 14.167h1.667v-5H9.168v5Zm.833-6.667c.236 0 .434-.08.594-.24a.803.803 0 0 0 .24-.593.806.806 0 0 0-.24-.594.807.807 0 0 0-.594-.24.806.806 0 0 0-.593.24.806.806 0 0 0-.24.594c0 .236.08.434.24.594.16.16.357.24.593.24Zm0 10.834a8.115 8.115 0 0 1-3.25-.657 8.415 8.415 0 0 1-2.646-1.78 8.416 8.416 0 0 1-1.78-2.647A8.115 8.115 0 0 1 1.667 10c0-1.152.219-2.236.656-3.25a8.416 8.416 0 0 1 1.781-2.646 8.415 8.415 0 0 1 2.646-1.78A8.115 8.115 0 0 1 10 1.667c1.153 0 2.236.219 3.25.656a8.415 8.415 0 0 1 2.646 1.781 8.416 8.416 0 0 1 1.781 2.646 8.115 8.115 0 0 1 .657 3.25 8.115 8.115 0 0 1-.657 3.25 8.416 8.416 0 0 1-1.78 2.646 8.415 8.415 0 0 1-2.647 1.781 8.115 8.115 0 0 1-3.25.657Zm0-1.667c1.861 0 3.438-.646 4.73-1.938 1.291-1.291 1.937-2.868 1.937-4.729 0-1.86-.646-3.437-1.938-4.729-1.291-1.292-2.868-1.937-4.729-1.937-1.86 0-3.437.645-4.729 1.937-1.292 1.292-1.937 2.868-1.937 4.73 0 1.86.645 3.437 1.937 4.729 1.292 1.291 2.868 1.937 4.73 1.937Z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex mb-2 mt-2">
                    <div className="w-8/12 font-semibold flex truncate md:pl-1 sm:mr-8 md:mr-0 text-white dark:bg-gray-800 text-xl">
                      Claims
                    </div>
                    <div className="w-4/12 font-semibold flex truncate sm:pl-4 text-white dark:bg-gray-800 text-xl">
                      Values
                    </div>
                  </div>

                  {proofDetailsData?.map(
                    (item: { name: string; value: string }, i: any) => (
                      <div
                        key={item.name + i}
                        className="flex w-full text-white border-b last:border-b-0"
                      >
                        <div className={`flex w-full text-lg`}>
                          <div className="w-8/12 m-1 p-1 text-start dark:text-white text-lg break-words shrink-0">
                            {item.name}
                          </div>
                          <div className="w-4/12 m-1 truncate p-1 flex justify-start dark:text-white text-lg">
                            {loading && !item.value ? (
                              <div role="status">
                                <svg
                                  aria-hidden="true"
                                  className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <>{item.value}</>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
              {/* <div className="flex items-center justify-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <a
                    href="/"
                    type="button"
                    className="text-white bg-blue-700 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary"
                  >
                    Start over
                  </a>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannedContentComponent;
