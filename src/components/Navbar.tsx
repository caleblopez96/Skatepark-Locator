import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // false = menu closed

    const toggleMenu = () => {
        setIsOpen(!isOpen); // toggle menu state
    };

    return (
        <nav className="bg-red-500 p-8 flex justify-end items-center relative">
            {/* Hamburger button */}
            <button onClick={toggleMenu}>☰</button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="dropdown">
                    <a href="#home">Home</a>
                    <a href="#locator">Locator</a>
                    <a href="#favorites">My Parks</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
