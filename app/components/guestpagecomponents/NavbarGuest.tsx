// /app/components/Navbar.tsx
import Image from "next/image";
import Link from 'next/link'

export const Navbar = () => {
    return (
        <header className="w-full px-8 text-gray-700 bg-white">
            <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
                <div className="relative flex flex-col md:flex-row">
               
                    <Link href="/">
                        <div className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                        <div className="bg-white mb-2 mr-2">
                            <Image
                                src="/images/sbblogo.png" // replace this with the path to your logo
                                alt="Blog logo"
                                width={40}
                                height={40}
                            />
                        </div>
                            <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">SBB DAO<span className="text-indigo-600">.</span>
                            </span>
                            
                        </div> 
                    </Link>
                    <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
                        <Link href="/blog">
                            <div className="mr-5 hover:text-gray-900">Blog</div>
                        </Link>

                        <Link href="/features">
                            <div className="mr-5 hover:text-gray-900">DAO Features</div>
                        </Link>
                        
                        <Link href="/businessownersguest">
                            <div className="mr-5 hover:text-gray-900">Business Owners</div>
                        </Link>

                        <Link href="/comsupportersguest">
                            <div className="mr-5 hover:text-gray-900">Community Supporters</div>
                        </Link>

                        <Link href="/how-it-works">
                            <div className="mr-5 hover:text-gray-900">How It Works</div>
                        </Link>

                        <Link href="/sbbuniversityguest">
                            <div className="mr-5 hover:text-gray-900">SBB University</div>
                        </Link>
                        
                    </nav>
                </div>
                <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
                    <Link href="/sign-up">
                        <div className="text-base font-medium leading-6 text-gray-600 whitespace-nowrap hover:text-gray-500">Sign up</div>
                    </Link>
                    <Link href="/sign-in">
                        <div className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-nowrap bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700">Log in</div>
                    </Link>
                </div>
            </div>
        </header>
    )
}
