import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4">
            <div className="text-center">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <h1 className="text-8xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse">
                        404
                    </h1>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-20 blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-200 rounded-full opacity-20 blur-xl"></div>
                </div>

                {/* Message */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                    Oops! Page Not Found
                </h2>
                

                {/* Go Home Button */}
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                        />
                    </svg>
                    Go Home
                </Link>

                {/* Decorative elements */}
                <div className="mt-12 flex justify-center space-x-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;