function Welcome() {
    return (
        <div
            className="flex mb-4 flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 bg-cover bg-[url(/ribbon.svg)] relative overflow-hidden"
        >
            {/* <div className='bg-overlay w-full h-full absolute'></div> */}
            <div className="w-full min-h-[148px] p-6 z-10 ml-4">
                <div className="text-2xl text-white font-medium">
                    Welcome, Ram Sharma!
                </div>
                <p className='mt-2 text-md font-light text-white'>
                    Get started with verifying credentials
                </p>
            </div>
        </div>
    )
}

export default Welcome