import { useEffect, useState } from "react";
import { skateparks } from "../parkData";
import type { Skatepark } from "../parkData";

interface FavoritesPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FavoritesPanel({ isOpen, onClose }: FavoritesPanelProps) {
    const [favoritedParks, setFavoritedParks] = useState<Skatepark[]>([]);

    useEffect(() => {
        if (isOpen) {
            // load the stored favs from local storage
            const stored = localStorage.getItem("favoritedParks");
            // if park exist by id add it to favs
            if (stored) {
                const favoriteIds: number[] = JSON.parse(stored);
                const parks = skateparks.filter((park) => favoriteIds.includes(park.id));
                setFavoritedParks(parks);
            }
        }
    }, [isOpen]);

    // remove fav from favs
    const removeFavorite = (parkId: number) => {
        const stored = localStorage.getItem("favoritedParks");
        if (stored) {
            const favoriteIds: number[] = JSON.parse(stored);
            const updated = favoriteIds.filter((id) => id !== parkId);
            localStorage.setItem("favoritedParks", JSON.stringify(updated));
            setFavoritedParks(favoritedParks.filter((park) => park.id !== parkId));
            // create an event to update Skateparks to keep everything in sync
            window.dispatchEvent(new CustomEvent("favoriteRemoved", { detail: { parkId } }));
        }
    };

    return (
        <>
            {/* side panel backdrop */}
            {isOpen && <div className="fixed inset-0 bg-black/30 z-[60] transition-opacity" onClick={onClose} />}

            {/* side Panel */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-2xl font-bold text-gray-900">My Favorite Parks</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-gray-900 text-3xl leading-none"
                            aria-label="Close panel"
                        >
                            ×
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {favoritedParks.length === 0 ? (
                            <div className="text-center text-gray-500 mt-8">
                                <p className="text-4xl mb-4">🤍</p>
                                <p>No favorite parks yet!</p>
                                <p className="text-sm mt-2">Click the heart on any park to add it here.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {favoritedParks.map((park) => (
                                    <div
                                        key={park.id}
                                        className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition"
                                    >
                                        {park.image && (
                                            <img src={park.image} alt={park.name} className="w-full h-32 object-cover rounded-md mb-3" />
                                        )}

                                        <h3 className="font-semibold text-lg text-gray-900 mb-2">{park.name}</h3>

                                        {park.street && (
                                            <div className="text-sm text-gray-600 mb-2">
                                                <p>{park.street}</p>
                                                <p>
                                                    {park.city && <span>{park.city}</span>}
                                                    {park.state && <span>, {park.state}</span>}
                                                    {park.zip && <span> {park.zip}</span>}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 mb-2 text-sm">
                                            {park.bikeFriendly ? (
                                                <>
                                                    <span className="text-gray-600">Bike Friendly</span>
                                                    <span className="text-green-600 font-bold">✔</span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="text-gray-600">No Bikes</span>
                                                    <span className="text-red-600 font-bold">✖</span>
                                                </>
                                            )}
                                        </div>

                                        <p className="text-gray-500 text-sm mb-3">Hours: {park.hours}</p>

                                        <button
                                            onClick={() => removeFavorite(park.id)}
                                            className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition text-sm font-medium"
                                        >
                                            Remove Favorite
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
