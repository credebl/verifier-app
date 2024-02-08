function Welcome() {
    return (
        <div
            className="flex mb-4 flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 bg-cover bg-[url(/public/ribbon.svg)] relative overflow-hidden bg-center"
        >
            <div className='w-full h-full absolute'></div>
            <div className="w-full h-28 p-6 z-10">
                <div>
                    <span className="text-3xl font-semibold text-white">Welcome!</span>
                    <span className="text-xl ml-4 text-gray-50">
                        Ram Sharma
                    </span>
                </div>
                <div className="text-xs text-white mt-2">
                    Get started with verifying credentials
                </div>
            </div>
        </div>
    )
}

export default Welcome