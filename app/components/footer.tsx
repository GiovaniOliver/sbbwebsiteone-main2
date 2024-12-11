import Link from 'next/link';
// app/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-10 px-5 mt-16">
            <div className="grid grid-cols-2 gap-10">
                <div>
                    <h2 className="text-2xl font-bold mb-4">About Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, 
                        pulvinar facilisis justo mollis, auctor consequat urna.</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                    <ul>
                        <li className="mb-2">
                            <Link href="/privacy-policy">
                                <div>Privacy Policy</div>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/terms-of-service">
                                <div>Terms of Service</div>
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/contact">
                                <div>Contact Us</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-10 text-center">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
