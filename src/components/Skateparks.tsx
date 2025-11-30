import { useEffect, useState } from "react";
import EspeePark from "../assets/EspeePark.avif";
import ManselPark from "../assets/ManselPark.jpg";
import Freestone from "../assets/FreeStonePark.webp";
import AJS from "../assets/AJS.webp";
import TempeSkatepark from "../assets/TempeSkatepark.webp";
import ChandlerSkatepark from "../assets/ChandlerSkatepark.webp";
import Map from "../components/Map";

interface Skatepark {
    id: number;
    name: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    bikeFriendly: boolean;
    image?: string;
    hours?: string;
}

interface ParkInteraction {
    liked: boolean;
    disliked: boolean;
    favorited: boolean;
}

export default function Skateparks() {
    const [parks, setParks] = useState<Skatepark[]>([]);
    const [interactions, setInteractions] = useState<Record<number, ParkInteraction>>({});

    useEffect(() => {
        const placeholder = [
            {
                id: 1,
                name: "Espee Bike Park",
                street: "450 E Knox Rd",
                city: "Chandler",
                state: "AZ",
                zip: "85225",
                bikeFriendly: true,
                image: EspeePark,
                hours: "6:30 AM - 10:30 PM",
            },
            {
                id: 2,
                name: "Mansel Skatepark",
                street: "20900-23000 196th St",
                city: "Queen Creek",
                state: "AZ",
                zip: "85142",
                bikeFriendly: true,
                image: ManselPark,
                hours: "7:00 AM - 9:30 PM",
            },
            {
                id: 3,
                name: "Freestone Skatepark",
                street: "1045 E Juniper Ave.",
                city: "Gilbert",
                state: "AZ",
                zip: "85234",
                bikeFriendly: false,
                image: Freestone,
                hours: "5:30 AM - 9:00 PM",
            },
            {
                id: 4,
                name: "Apache Junction Skatepark",
                street: "1091 W Southern Ave.",
                city: "Apache Junction",
                state: "AZ",
                zip: "85120",
                bikeFriendly: false,
                image: AJS,
                hours: "8:00 AM - 9:00 PM",
            },
            {
                id: 5,
                name: "Tempe Skatepark",
                street: "8401 S Hardy Dr.",
                city: "Tempe",
                state: "AZ",
                zip: "85284",
                bikeFriendly: false,
                image: TempeSkatepark,
                hours: "6:00 AM - 10:00 PM",
            },
            {
                id: 6,
                name: "Chandler Skatepark",
                street: "4500 S Basha Rd.",
                city: "Chandler",
                state: "AZ",
                zip: "85248",
                bikeFriendly: false,
                image: ChandlerSkatepark,
                hours: "7:00 AM - 10:30 PM",
            },
        ];

        setParks(placeholder);
        // Initialize interactions
        const initialInteractions: Record<number, ParkInteraction> = {};
        placeholder.forEach((park) => {
            initialInteractions[park.id] = { liked: false, disliked: false, favorited: false };
        });
        setInteractions(initialInteractions);
    }, []);

    const toggleLike = (parkId: number) => {
        setInteractions((prev) => ({
            ...prev,
            [parkId]: {
                ...prev[parkId],
                liked: !prev[parkId]?.liked,
                disliked: false, // Remove dislike when liking
            },
        }));
    };

    const toggleDislike = (parkId: number) => {
        setInteractions((prev) => ({
            ...prev,
            [parkId]: {
                ...prev[parkId],
                disliked: !prev[parkId]?.disliked,
                liked: false, // Remove like when disliking
            },
        }));
    };

    const toggleHeart = (parkId: number) => {
        setInteractions((prev) => ({
            ...prev,
            [parkId]: {
                ...prev[parkId],
                favorited: !prev[parkId]?.favorited,
            },
        }));
    };

    return (
        <section id="skateparks" className="w-full bg-gray-100 py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">Skatepark Locator</h2>
                <Map />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {parks.map((park) => (
                        <div key={park.id} className="bg-white p-6 rounded-xl shadow border border-gray-200 flex flex-col h-full">
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
            </div>
        </section>
    );
}
