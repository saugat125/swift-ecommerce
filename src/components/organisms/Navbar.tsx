import { Link } from 'react-router-dom';
import Wishlist from './Wishlist';
import Cart from './Cart';

const Navbar = () => {
  return (
    <nav className="w-full min-h-12 py-4 px-6 sm:px-8 md:px-16 lg:px-20 border-b border-gray-300 shadow-sm bg-white mb-2 md:mb-6 lg:mb-10">
      <div className="flex justify-between items-center">
        <div>
          <Link to="/">
            <h1 className="scroll-m-20 text-xl sm:text-2xl font-extrabold tracking-tight text-balance text-[#00bd32] whitespace-nowrap">
              Swift Ecommerce
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <Wishlist />
          <Cart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
