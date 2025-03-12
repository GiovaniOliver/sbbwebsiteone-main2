import Link from "next/link";

/* eslint-disable react/no-string-refs */
const CallToActionComSupp: React.FC = () => {
    return (
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block">Start supporting black-owned businesses today.</span>
          </h2>
          <Link href="/signup">
          <div className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto">
            Sign up
          </div>
          </Link>
        </div>
      </div>
    );
  };
  
  export default CallToActionComSupp;
  