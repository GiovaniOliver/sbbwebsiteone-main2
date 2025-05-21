export default function AboutUsSection() {
  return (
    <div className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
            About Us
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Our Mission</h3>
            <p className="text-gray-600 text-center">
              To create a decentralized ecosystem that supports black-owned businesses and fosters community development through innovative technology.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Community Power</h3>
            <p className="text-gray-600 text-center">
              We believe in the power of community and the importance of supporting local businesses to create sustainable economic growth.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Our Values</h3>
            <p className="text-gray-600 text-center">
              Integrity, inclusivity, innovation, and empowerment guide our approach to creating a more supportive ecosystem for all.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join us in our mission to create a more inclusive and supportive ecosystem. Together, we can make a difference in our communities.
          </p>
          <button className="mt-8 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
            Learn More About Our Vision
          </button>
        </div>
      </div>
    </div>
  );
}
  