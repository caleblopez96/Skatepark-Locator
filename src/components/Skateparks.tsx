import { useEffect, useState } from "react";
import Map from "../components/Map";
import { skateparks } from "../parkData";

interface ParkInteraction {
    liked: boolean;
    disliked: boolean;
    favorited: boolean;
}

export default function Skateparks() {
    const [interactions, setInteractions] = useState<Record<number, ParkInteraction>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const parksPerPage = 6;

    useEffect(() => {
        // load favs from localStorage
        const storedFavorites = localStorage.getItem("favoritedParks");
        const favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];

        const initialInteractions: Record<number, ParkInteraction> = {};
        skateparks.forEach((park) => {
            initialInteractions[park.id] = {
                liked: false,
                disliked: false,
                favorited: favoriteIds.includes(park.id),
            };
        });
        setInteractions(initialInteractions);

        // listen for favorite removals from the panel
        const handleFavoriteRemoved = (event: Event) => {
            const customEvent = event as CustomEvent<{ parkId: number }>;
            const { parkId } = customEvent.detail;
            setInteractions((prev) => ({
                ...prev,
                [parkId]: {
                    ...prev[parkId],
                    favorited: false,
                },
            }));
        };

        window.addEventListener("favoriteRemoved", handleFavoriteRemoved);
        return () => window.removeEventListener("favoriteRemoved", handleFavoriteRemoved);
    }, []);

    const toggleLike = (parkId: number) => {
        setInteractions((prev) => ({
            ...prev,
            [parkId]: {
                ...prev[parkId],
                liked: !prev[parkId]?.liked,
                disliked: false,
            },
        }));
    };

    const toggleDislike = (parkId: number) => {
        setInteractions((prev) => ({
            ...prev,
            [parkId]: {
                ...prev[parkId],
                disliked: !prev[parkId]?.disliked,
                liked: false,
            },
        }));
    };

    const toggleHeart = (parkId: number) => {
        setInteractions((prev) => {
            const newFavorited = !prev[parkId]?.favorited;

            // update localStorage
            const storedFavorites = localStorage.getItem("favoritedParks");
            const favoriteIds: number[] = storedFavorites ? JSON.parse(storedFavorites) : [];

            if (newFavorited) {
                // add to favorites
                if (!favoriteIds.includes(parkId)) {
                    favoriteIds.push(parkId);
                }
            } else {
                // remove from favorites
                const index = favoriteIds.indexOf(parkId);
                if (index > -1) {
                    favoriteIds.splice(index, 1);
                }
            }

            localStorage.setItem("favoritedParks", JSON.stringify(favoriteIds));

            // send event for navbar to update count
            // Use setTimeout to avoid updating during render
            setTimeout(() => {
                window.dispatchEvent(new Event("storage"));
            }, 0);

            return {
                ...prev,
                [parkId]: {
                    ...prev[parkId],
                    favorited: newFavorited,
                },
            };
        });
    };

    const indexOfLastPark = currentPage * parksPerPage;
    const indexOfFirstPark = indexOfLastPark - parksPerPage;
    const currentParks = skateparks.slice(indexOfFirstPark, indexOfLastPark);
    const totalPages = Math.ceil(skateparks.length / parksPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <section id="locator" className="w-full bg-gray-100 py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Skatepark Locator</h2>
                <span className="text-gray-900">🟢 = Bike Friendly</span>
                <br />
                <span className="text-gray-900">🔴 = No Bikes</span>
                <Map />

                <h3 id="allParks" className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-20">
                    All Parks
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentParks.map((park) => (
                        <div
                            key={park.id}
                            className="bg-white p-6 rounded-xl shadow border border-gray-200 flex flex-col h-full hover:scale-105 transition-transform duration-500"
                        >
                            {park.image && <img src={park.image} alt={park.name} className="w-full h-40 object-cover rounded-md mb-4" />}

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{park.name}</h3>

                            {park.street && (
                                <div className="text-sm text-gray-600 mb-3">
                                    <p>{park.street}</p>
                                    <p>
                                        {park.city && <span>{park.city}</span>}
                                        {park.state && <span>, {park.state}</span>}
                                        {park.zip && <span> {park.zip}</span>}
                                    </p>
                                </div>
                            )}

                            <div className="flex items-center gap-2 mb-2">
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
                            <p className="text-gray-500 text-sm mb-auto">Hours: {park.hours}</p>

                            <div className="mt-2 flex gap-3">
                                <button
                                    onClick={() => toggleLike(park.id)}
                                    className="p-2 text-2xl transition hover:scale-110"
                                    title="Like"
                                >
                                    {interactions[park.id]?.liked ? "👍" : "👍🏻"}
                                </button>
                                <button
                                    onClick={() => toggleDislike(park.id)}
                                    className="p-2 text-2xl transition hover:scale-110"
                                    title="Dislike"
                                >
                                    {interactions[park.id]?.disliked ? "👎" : "👎🏻"}
                                </button>
                                <button
                                    onClick={() => toggleHeart(park.id)}
                                    className="p-2 text-2xl transition hover:scale-110"
                                    title="Favorite"
                                >
                                    {interactions[park.id]?.favorited ? "❤️" : "🤍"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center items-center gap-4">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-800 hover:scale-105 text-white rounded-lg transition hover:cursor-pointer"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700 font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-800 hover:scale-105 text-white rounded-lg transition hover:cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
}
