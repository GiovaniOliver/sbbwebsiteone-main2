import Image from "next/image";
import Link from 'next/link';
// app/components/Header.tsx
import React from "react";

const HeaderBlog = () => {
  return (
    <header className="w-full px-8 text-gray-700 bg-white">
      <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8 md:border-l md:border-gray-200">
          <Link href="/blog" className="mr-5 hover:text-gray-900">
            Blog
          </Link>
          <Link href="/sbbuniversity" className="mr-5 hover:text-gray-900">
            SBB University
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderBlog;
