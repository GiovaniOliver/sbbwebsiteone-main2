export default function BusinessDirectorySection() {
  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            Black-Owned Business Directory
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Discover and support a diverse range of black-owned businesses in our comprehensive directory.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Business Category Cards */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-40 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Retail & Services</h3>
              <p className="text-gray-600 mb-4">Discover clothing stores, beauty salons, and various service providers in your area.</p>
              <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
                Explore Category
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-40 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Food & Restaurants</h3>
              <p className="text-gray-600 mb-4">Find delicious restaurants, cafes, bakeries, and food services near you.</p>
              <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
                Explore Category
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-40 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Health & Wellness</h3>
              <p className="text-gray-600 mb-4">Explore health services, fitness centers, and wellness practitioners.</p>
              <a href="#" className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors flex items-center">
                Explore Category
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Our directory promotes exposure and visibility for black-owned businesses. Join us in supporting these businesses and helping them thrive.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
            Explore Full Directory
          </button>
        </div>
      </div>
    </div>
  );
}
  