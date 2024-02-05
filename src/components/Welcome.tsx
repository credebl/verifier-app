function Welcome() {
    return (
        <div
            className="flex mb-4 flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 bg-cover bg-[url(https://images.unsplash.com/photo-1535136104956-115a2cd67fc4?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] relative overflow-hidden bg-center"
        >
            <div className='bg-overlay w-full h-full absolute'></div>
            <div className="w-full h-28 p-6 z-10">
                <div>
                    <span className="text-3xl font-semibold text-white">Welcome!</span>
                    <span className="text-xl ml-4 text-gray-50">
                        Ram Sharma
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Welcome