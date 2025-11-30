import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">Park Finder</div>

                <div className="hidden md:flex space-x-6 text-white">
                    <a href="#home" className="hover:text-gray-200 transition">
                        Home
                    </a>
                    <a href="#locator" className="hover:text-gray-200 transition">
                        Locator
                    </a>
                    <a href="#favorites" className="hover:text-gray-200 transition">
                        My Parks
                    </a>
                </div>

                {/* mobile */}
                <button onClick={toggleMenu} className="md:hidden text-white text-3xl focus:outline-none" aria-label="Toggle menu">
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* dropdown */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 flex flex-col space-y-3 bg-red-600 p-4 rounded">
                    <a href="#home" className="text-white hover:text-gray-200 transition py-2" onClick={() => setIsMenuOpen(false)}>
                        Home
                    </a>
                    <a href="#locator" className="text-white hover:text-gray-200 transition py-2" onClick={() => setIsMenuOpen(false)}>
                        Locator
                    </a>
                    <a href="#favorites" className="text-white hover:text-gray-200 transition py-2" onClick={() => setIsMenuOpen(false)}>
                        My Parks
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
