import React from 'react';

const FundingAndFinancialResourcesBusiOwn: React.FC = () => {
    return (
        <section className="bg-white py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
                    Funding and Financial Resources
                </h1>
                <div className="w-full mb-4">
                    <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
                </div>
                <p className="text-gray-600 text-center mb-8">
                    We provide support for black business owners in accessing funding and financial resources. Here you can find information on grants, loans, or investment opportunities specifically tailored for black-owned businesses.
                </p>
                {/* Add more content here */}
            </div>
        </section>
    );
};

export default FundingAndFinancialResourcesBusiOwn;
