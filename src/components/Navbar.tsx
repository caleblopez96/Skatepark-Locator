import { useState, useEffect } from "react";
import WeatherWidget from "./WeatherWidget";

interface NavbarProps {
    onOpenFavorites: () => void;
}

const Navbar = ({ onOpenFavorites }: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [, setZip] = useState<string>("");
    const [favoritesCount, setFavoritesCount] = useState(0);

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
                            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
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

        // load the count of favd parks
        updateFavoritesCount();

        // listen for storage changes, favorite removes, AND favorite toggles
        const handleStorageChange = () => updateFavoritesCount();
        const handleFavoriteRemoved = () => updateFavoritesCount();
        const handleFavoriteToggled = () => updateFavoritesCount();

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("favoriteRemoved", handleFavoriteRemoved);
        window.addEventListener("favoriteToggled", handleFavoriteToggled);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("favoriteRemoved", handleFavoriteRemoved);
            window.removeEventListener("favoriteToggled", handleFavoriteToggled);
        };
    }, []);

    const updateFavoritesCount = () => {
        const stored = localStorage.getItem("favoritedParks");
        if (stored) {
            const favoriteIds: number[] = JSON.parse(stored);
            setFavoritesCount(favoriteIds.length);
        } else {
            setFavoritesCount(0);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();

        // if home just scroll to top
        if (sectionId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsMenuOpen(false);
            return;
        }

        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsMenuOpen(false);
    };

    const handleFavoritesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        onOpenFavorites();
        setIsMenuOpen(false);
        updateFavoritesCount();
    };

    return (
        <nav className="p-4 bg-gray-300 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-gray-900 text-xl font-bold">Skatepark Finder</div>

                {/* desktop nav */}
                <div className="hidden md:flex items-center gap-6 text-white">
                    <a href="#home" onClick={(e) => scrollToSection(e, "home")} className="hover:text-gray-200 transition text-gray-900">
                        Home
                    </a>
                    <a
                        href="#locator"
                        onClick={(e) => scrollToSection(e, "locator")}
                        className="hover:text-gray-200 transition text-gray-900"
                    >
                        Locator
                    </a>

                    <a
                        href="#allParks"
                        onClick={(e) => scrollToSection(e, "allParks")}
                        className="hover:text-gray-200 transition text-gray-900"
                    >
                        Explore Parks
                    </a>

                    <a href="#favorites" onClick={handleFavoritesClick} className="hover:text-gray-200 transition text-gray-900 relative">
                        My Parks
                        {favoritesCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                {favoritesCount}
                            </span>
                        )}
                    </a>

                    <WeatherWidget />
                </div>

                {/* menu toggle for mobile */}
                <button onClick={toggleMenu} className="md:hidden text-gray-900 text-3xl focus:outline-none" aria-label="Toggle menu">
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* mobile dropdown */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 flex flex-col space-y-3 p-4 rounded">
                    <a
                        href="#home"
                        onClick={(e) => scrollToSection(e, "home")}
                        className="text-gray-900 hover:text-gray-200 transition py-2"
                    >
                        Home
                    </a>
                    <a
                        href="#locator"
                        onClick={(e) => scrollToSection(e, "locator")}
                        className="text-gray-900 hover:text-gray-200 transition py-2"
                    >
                        Locator
                    </a>
                    <a
                        href="#favorites"
                        onClick={handleFavoritesClick}
                        className="text-gray-900 hover:text-gray-200 transition py-2 flex items-center gap-2"
                    >
                        My Parks
                        {favoritesCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                {favoritesCount}
                            </span>
                        )}
                    </a>

                    {/* mobile weather widg */}
                    <div className="pt-2 border-t border-gray-700">
                        <WeatherWidget />
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
