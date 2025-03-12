// app/components/Header.tsx
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="p-4 bg-black text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div>
            <h1 className="text-2xl font-bold">Website Logo</h1>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/about">
                <div>About</div>
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
