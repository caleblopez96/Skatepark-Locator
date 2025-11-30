import { useEffect, useState } from "react";
import EspeePark from "../assets/EspeePark.avif";

interface Skatepark {
    id: number;
    name: string;
    bikeFriendly: boolean;
    image?: string;
}

export default function Skateparks() {
    const [parks, setParks] = useState<Skatepark[]>([]);

    useEffect(() => {
        const placeholder = [
            { id: 1, name: "Espee Bike Park", bikeFriendly: true, image: EspeePark },
            { id: 2, name: "Paradise Valley Skatepark", bikeFriendly: false },
            { id: 3, name: "Steele Indian School Park", bikeFriendly: true },
            { id: 4, name: "Pecos Skatepark", bikeFriendly: true },
        ];

        setParks(placeholder);
    }, []);

    return (
        <section id="skateparks" className="w-full bg-gray-100 py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-900">Popular Skateparks in Phoenix</h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {parks.map((park) => (
                        <div key={park.id} className="bg-white p-6 rounded-xl shadow border border-gray-200">
                            {/* IMAGE */}
                            {park.image && <img src={park.image} alt={park.name} className="w-full h-40 object-cover rounded-md mb-4" />}

                            <h3 className="text-xl font-semibold text-gray-900">{park.name}</h3>

                            <p className="mt-2 text-gray-600 flex items-center gap-2">
                                {park.bikeFriendly ? (
                                    <>
                                        <span className="text-green-600 font-bold">✔</span>
                                        Bike Friendly
                                    </>
                                ) : (
                                    <>
                                        <span className="text-red-600 font-bold">✖</span>
                                        No Bikes
                                    </>
                                )}
                            </p>

                            <p className="text-gray-500 mt-1 text-sm">Weather: Coming soon...</p>

                            <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                                Add to Favorites
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
