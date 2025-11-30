import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Skatepark {
    id: number;
    name: string;
    lat: number;
    lng: number;
    bikeFriendly: boolean;
}

// espee: 33.32872471816101, -111.83449676096131
// mansel: 33.253411126792194, -111.66081760640316
// freestone: 33.35881302300737, -111.76945410876573
// ajs: 33.39206866853851, -111.55810933217953
// tempe: 33.339505109505595, -111.95308158568407

export default function SkateparkMap() {
    const parks: Skatepark[] = [
        { id: 1, name: "Espee Bike Park", lat: 33.32872471816101, lng: -111.83449676096131, bikeFriendly: true },
        { id: 2, name: "Mansel Carter Oasis Skatepark", lat: 33.253411126792194, lng: -111.66081760640316, bikeFriendly: true },
        { id: 3, name: "Freestone Skatepark", lat: 33.35881302300737, lng: -111.76945410876573, bikeFriendly: false },
        { id: 4, name: "Apache Junction Skatepark", lat: 33.39206866853851, lng: -111.55810933217953, bikeFriendly: false },
        { id: 5, name: "Tempe Skatepark", lat: 33.339505109505595, lng: -111.95308158568407, bikeFriendly: false },
        { id: 5, name: "Chandler Skatepark", lat: 33.24041849001316, lng: -111.85943387535866, bikeFriendly: false },
    ];

    return (
        <section className="w-full bg-gray-100 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-gray-300">
                    <MapContainer center={[33.4484, -112.074]} zoom={9} scrollWheelZoom={false} className="w-full h-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {parks.map((park) => (
                            <CircleMarker
                                key={park.id}
                                center={[park.lat, park.lng]}
                                radius={10}
                                pathOptions={{
                                    color: park.bikeFriendly ? "#22c55e" : "#ef4444",
                                    fillColor: park.bikeFriendly ? "#22c55e" : "#ef4444",
                                    fillOpacity: 0.9,
                                }}
                            >
                                <Popup>{park.name}</Popup>
                            </CircleMarker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
}
