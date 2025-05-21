export default function JoinOurCommunitySection() {
  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 opacity-90"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/sbblogo.png')] bg-repeat opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20 shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Community</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 bg-indigo-600/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white text-center">Create an Account</h3>
              <p className="text-gray-300 text-center">
                Sign up for a free account to access all features and connect with our community.
              </p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 bg-indigo-600/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white text-center">Join Discussions</h3>
              <p className="text-gray-300 text-center">
                Participate in forums and discussions to share ideas and connect with others.
              </p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-16 h-16 bg-indigo-600/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white text-center">Stay Updated</h3>
              <p className="text-gray-300 text-center">
                Subscribe to our newsletter to receive updates on events and community news.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
              Become a part of our growing community and contribute to the development and growth of black-owned businesses. Join us today!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-bold text-black hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
                Sign Up Now
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white rounded-full font-bold text-white hover:bg-white hover:text-indigo-900 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  