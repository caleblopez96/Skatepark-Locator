import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { skateparks } from "../parkData";

export default function SkateparkMap() {
    return (
        <section className="w-full bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto mb-20">
                <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg border border-gray-300">
                    <MapContainer center={[33.4484, -112.074]} zoom={9} scrollWheelZoom={false} className="w-full h-full">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        {skateparks.map((park) => (
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
                                <Popup>
                                    <div className="min-w-[250px]">
                                        {park.image && (
                                            <img src={park.image} alt={park.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                        )}
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{park.name}</h3>

                                        {park.street && (
                                            <div className="text-xs text-gray-600 mb-2">
                                                <p>{park.street}</p>
                                                <p>
                                                    {park.city && <span>{park.city}</span>}
                                                    {park.state && <span>, {park.state}</span>}
                                                    {park.zip && <span> {park.zip}</span>}
                                                </p>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 mb-1 text-sm">
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
                                        <p className="text-gray-500 text-xs">Hours: {park.hours}</p>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
}
