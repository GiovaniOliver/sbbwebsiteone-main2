import React from 'react';

const DataPrivacyAndSecurityFeat: React.FC = () => {
    return (
        <section className="py-12 px-4 text-center">
            <div className="w-full max-w-2xl mx-auto">
                <h2 className="text-4xl mb-4 font-heading">Data Privacy and Security</h2>
                <p className="mb-6 text-gray-500 leading-relaxed">
                    We are committed to ensuring the privacy and security of your data. We adhere to industry best practices and compliance standards to protect user information and secure transactions. Our platform is designed with robust security measures to provide a safe and secure environment for our users.
                </p>
                <a className="inline-block py-4 px-8 leading-none text-white bg-indigo-500 hover:bg-indigo-600 rounded shadow" href="#">Learn more</a>
            </div>
        </section>
    );
};

export default DataPrivacyAndSecurityFeat;
