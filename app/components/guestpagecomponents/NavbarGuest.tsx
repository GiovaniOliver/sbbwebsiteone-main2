"use client";

// /app/components/Navbar.tsx
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-white/90 py-4'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/">
                    <div className="flex items-center">
                        <div className="bg-white rounded-full p-1">
                            <Image
                                src="/images/sbblogo.png"
                                alt="SBB DAO logo"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </div>
                        <span className="ml-2 text-xl font-black text-gray-900">
                            SBB DAO<span className="text-indigo-600">.</span>
                        </span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    <Link href="/blog">
                        <div className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Blog</div>
                    </Link>
                    <Link href="/daofeatures">
                        <div className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">DAO Features</div>
                    </Link>
                    <Link href="/businessownersguest">
                        <div className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Business Owners</div>
                    </Link>
                    <Link href="/comsupportersguest">
                        <div className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Community Supporters</div>
                    </Link>
                    <Link href="/how-it-works">
                        <div className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">How It Works</div>
                    </Link>
                    <Link href="/sbbuniversityguest">
                        <div className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">SBB University</div>
                    </Link>
                    <Link href="/buyingpower">
                        <div className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Buying Power</div>
                    </Link>
                </nav>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/signup">
                        <div className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">Sign Up</div>
                    </Link>
                    <Link href="/sign-in">
                        <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full shadow-sm hover:bg-indigo-700 transition-colors">
                            Sign In
                        </div>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-gray-900" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="container mx-auto px-4 py-3">
                        <nav className="flex flex-col space-y-3">
                            <Link href="/blog">
                                <div className="font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2">Blog</div>
                            </Link>
                            <Link href="/features">
                                <div className="font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2">DAO Features</div>
                            </Link>
                            <Link href="/businessownersguest">
                                <div className="font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2">Business Owners</div>
                            </Link>
                            <Link href="/comsupportersguest">
                                <div className="font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2">Community Supporters</div>
                            </Link>
                            <Link href="/how-it-works">
                                <div className="font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2">How It Works</div>
                            </Link>
                            <Link href="/sbbuniversityguest">
                                <div className="font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2">SBB University</div>
                            </Link>
                            <Link href="/buyingpower">
                                <div className="font-medium text-gray-700 hover:text-indigo-600 transition-colors py-2">Buying Power</div>
                            </Link>
                            <div className="flex space-x-4 pt-2 border-t border-gray-100">
                                <Link href="/signup">
                                    <div className="font-medium text-gray-700 hover:text-indigo-600 transition-colors">Sign Up</div>
                                </Link>
                                <Link href="/sign-in">
                                    <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full shadow-sm hover:bg-indigo-700 transition-colors">
                                        Sign In
                                    </div>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};
