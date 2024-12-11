import Image from "next/image";
// app/components/Header.tsx
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-8 bg-black">
      <div className="flex items-center space-x-4">
        <div className="bg-white mt-5">
          <Image
            src="/images/sbblogo.png" // replace this with the path to your logo
            alt="Blog logo"
            width={40}
            height={40}
          />
        </div>
        <h1 className="text-2xl text-white mt-5">SBB DAO Blog</h1>
      </div>
      <nav className="space-x-4 mt-8">
        <a href="/blog" className="text-white">Blog</a>
        <a href="/about" className="text-white">About Us</a>
        <a href="/how-it-works" className="text-white">How It Works</a>
        <a href="/features" className="text-white">Features</a>
        <a href="/sbbuniversity" className="text-white">SBB University</a>
        <a href="/contact" className="text-white">Contact</a>
        
        {/* add your other navigation links here */}
      </nav>
    </header>
  );
};

export default Header;
