import { useState, useEffect } from "react";
import WeatherWidget from "./WeatherWidget"; // <-- import weather component

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [, setZip] = useState<string>("");

    useEffect(() => {
        const savedZip = localStorage.getItem("userZip");
        if (savedZip) {
            setZip(savedZip);
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en
`
                        );
                        const data = await response.json();
                        const userZip = data.address?.postcode || "";
                        if (userZip) {
                            setZip(userZip);
                            localStorage.setItem("userZip", userZip);
                        }
                    } catch (error) {
                        console.error("Error fetching zip code:", error);
                    }
                });
            }
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="p-4 bg-gray-300 ">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-gray-900 text-xl font-bold">Skatepark Finder</div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6 text-white">
                    <a href="#home" className="hover:text-gray-200 transition text-gray-900">
                        Home
                    </a>
                    <a href="#locator" className="hover:text-gray-200 transition text-gray-900">
                        Locator
                    </a>
                    <a href="#favorites" className="hover:text-gray-200 transition text-gray-900">
                        My Parks
                    </a>

                    <WeatherWidget />
                </div>

                {/* Mobile menu toggle */}
                <button onClick={toggleMenu} className="md:hidden text-gray-900 text-3xl focus:outline-none" aria-label="Toggle menu">
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile dropdown */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 flex flex-col space-y-3 p-4 rounded">
                    <a href="#home" className="text-gray-900 hover:text-gray-200 transition py-2" onClick={() => setIsMenuOpen(false)}>
                        Home
                    </a>
                    <a href="#locator" className="text-gray-900 hover:text-gray-200 transition py-2" onClick={() => setIsMenuOpen(false)}>
                        Locator
                    </a>
                    <a href="#favorites" className="text-gray-900 hover:text-gray-200 transition py-2" onClick={() => setIsMenuOpen(false)}>
                        My Parks
                    </a>

                    {/* Weather widget inside mobile dropdown */}
                    <div className="pt-2 border-t border-gray-700">
                        <WeatherWidget />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
