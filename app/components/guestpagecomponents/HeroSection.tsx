"use client";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white overflow-hidden pt-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/sbblogo.png')] bg-repeat opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Social Network</span>
            </h1>
            <p className="text-xl md:text-2xl mb-20 text-gray-200 max-w-lg">
              Supporting black-owned businesses and community development through a decentralized ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-black hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
                Join Us
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-bold hover:bg-white hover:text-indigo-900 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl blur opacity-75"></div>
              <div className="relative bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <img 
                  src="/images/sbblogo.png" 
                  alt="SBB DAO" 
                  className="w-24 h-24 mx-auto mb-4"
                />
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">SBB DAO</h3>
                  <p className="text-gray-300 mb-4">Join our community of entrepreneurs, supporters, and change-makers.</p>
                  <div className="flex justify-center space-x-4">
                    <div className="bg-indigo-600/30 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="bg-indigo-600/30 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="bg-indigo-600/30 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
}
  