import React, { useEffect, useState } from "react";
import { Attributes } from "../../../common/common.constants";
import { ConvertToTitleCase } from "../../config/ConvertToTitleCase";

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
      setVerified(true);
      setData([
        {
          [`${Attributes.SL_NO}`]: "SLHF34H234GF24",
        },
        {
          [`${Attributes.STUDENT_NAME}`]: "ytdyyyyyyytttttttttttttttttttttttttttttttttt",
        },
        {
          [`${Attributes.UNIVERSITY_NAME}`]: "Tribhuvan University",
        },
        {
          [`${Attributes.CURRENT_SEMESTER_PERFORMANCE_SGA}`]: "7.36",
        },
        {
          [`${Attributes.CUMMULATIVE_SEMESTER_PERFORMANCE_SGA}`]: "8.34",
        },
      ])
    }, 3000);

    if (verifiedData?.length > 0) {
      setData(verifiedData);
      setVerified(true);
    }
  }, [verifiedData]);

  const proofDetailsData =
    data?.length > 0 &&
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

  console.log(1234, "proofDetailsData::", proofDetailsData, "Verified", data);
  return (
    <div className="py-4 px-12 sticky top-[60px] w-full border-b-slate-50 z-0">
      <div className="flex items-center justify-center p-4 md:p-5 border-0 border-gray-200 rounded-b dark:border-gray-600">
        <a
          href="/verify"
          type="button"
          className="text-white bg-primary hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Verify another
        </a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-start">
          <div className="block">
            <div className="mt-10 text-3xl font-medium text-gray-700 dark:text-white">
              Verification Progress:
            </div>
            <div className="flex items-center justify-center mt-6 mb-20">
              <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
                {[1, 2, 3, 4, 5].map((index) => (
                  <li
                    key={index}
                    className={`relative mb-16 last:-mb-4 ml-8 mt-2 ${index <= step ? "text-gray-700" : ""
                      }`}

                  >
                    <div
                      className={`absolute flex items-center justify-center w-10 h-10 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 -left-[53px] -top-2 ${index <= step ? "bg-green-200" : "bg-gray-100"
                        }`}
                    >
                      {index <= step ? (
                        <svg
                          className="w-5 h-5 text-green-500 dark:text-green-400"
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
                      ) : (
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-lg font-medium leading-tight">
                      {index === 1 && "Connection request sent to the student"}
                      {index === 2 && "Making secure connection with student"}
                      {index === 3 &&
                        "Certificate being requested from the student"}
                      {index === 4 &&
                        "Proof of certificate is received from the student"}
                      {index === 5 && `${verified ? "Verified" : "Verifying"} the claims of the certificate`}
                    </h3>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="py-12 flex w-full">
          <div className="relative p-4 w-full max-h-full">
            <div className="bg-gradient-to-r from-primary to-secondary relative rounded-lg shadow-xl border border-gray-200 dark:bg-gray-700 ">
              {verified && (
                <div className="verified-stamp flex justify-end mr-14 absolute -top-[65px] -right-[95px]">
                  <img
                    src="/verified-stamp.svg"
                    className="w-[6rem] h-[6rem] mt-4"
                  />
                </div>
              )}
              <div className="p-4 md:p-5 space-y-3">
                <div className="flex h-full flex-col justify-center gap-0 sm:p-0">
                  <div className="flex items-center">
                    <div className="font-semibold flex truncate md:pl-1 sm:mr-8 md:mr-0 text-white dark:bg-gray-800 text-2xl mb-2 mt-0 shrink-0">
                      Verified Data
                    </div>
                    <div className='w-full'>
                      <button className='group' type="button" data-tooltip-target="tooltip-top" data-tooltip-placement="bottom">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mb-2 text-white ml-2 cursor-pointer">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        <div className="opacity-0 group-hover:!opacity-100 invisible group-hover:visible inline-block absolute z-10 px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 text-start">
                          What is verified?
                          {/* <ol style={{ listStyle: "desc" }} className='pl-4'>
                            <li>Download the CSV file or utilize the existing one</li>
                            <li>Update CSV file with credential data</li>
                            <li>Upload CSV file</li>
                          </ol> */}
                        </div>
                      </button>
                    </div>
                  </div>

                  <table>
                    <tr className="mb-2 mt-2 border-b ">
                      <th className="font-semibold text-md m-1 p-1 text-start text-white break-words">
                        Claims
                      </th>
                      <th className="font-semibold text-md m-1 p-1 text-start text-white break-words">
                        Values
                      </th>
                    </tr>

                    {proofDetailsData?.map(
                      (item: { name: string; value: string }, i: any) => (
                        <tr
                          key={item.name + i}
                          className="w-full check-item text-white border-b last:border-b-0"
                        >
                          <td className="p-1 w-1/2 text-start font-medium dark:text-white text-sm break-words shrink-0">
                            {/* {item.name} */}
                            {ConvertToTitleCase(item.name)}
                          </td>
                          <td className="p-1 flex justify-start dark:text-white text-sm">
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
                              <div className="check flex justify-between items-center w-full">
                                <div className="truncate line-clamp-2 max-h-[56px] whitespace-normal word-break-words"  style={{ width: 'calc(100% - 2rem)' }}>{item.value}</div>
                                <div className="">
                                  <svg
                                    className="w-5 h-5 p-1 rounded-full text-white bg-[#4C8900]"
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
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </table>
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
