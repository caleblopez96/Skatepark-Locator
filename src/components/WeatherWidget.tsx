import { useEffect, useState } from "react";

export default function WeatherWidget() {
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [locationDenied, setLocationDenied] = useState(false);

    useEffect(() => {
        requestLocation();
    }, []);

    function requestLocation() {
        setLoading(true);
        setError("");

        if (!navigator.geolocation) {
            setError("Geolocation not supported");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchWeather(position.coords.latitude, position.coords.longitude);
            },
            (err) => {
                setLocationDenied(true);
                setError("Location access denied" + { err });
                setLoading(false);
            }
        );
    }

    async function fetchWeather(latitude: number, longitude: number) {
        setLoading(true);
        setError("");

        try {
            const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`
            );
            const weatherData = await weatherRes.json();

            setWeather(weatherData.current_weather);
        } catch (err: any) {
            setError(err.message || "Error fetching weather");
        } finally {
            setLoading(false);
        }
    }

    function getIcon(code: number) {
        if (code === 0) return "☀️";
        if (code >= 1 && code <= 3) return "🌤️";
        if (code >= 45 && code <= 48) return "🌫️";
        if (code >= 51 && code <= 67) return "🌧️";
        if (code >= 71 && code <= 77) return "❄️";
        if (code >= 80 && code <= 82) return "🌦️";
        if (code >= 95 && code <= 99) return "⛈️";
        return "🌡️";
    }

    if (loading) {
        return <div className="text-white text-sm">Loading weather...</div>;
    }

    if (error) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-red-400 text-sm">{error}</span>
                {locationDenied && (
                    <button onClick={requestLocation} className="text-blue-400 text-xs underline hover:text-blue-300">
                        Retry
                    </button>
                )}
            </div>
        );
    }

    if (weather) {
        const icon = getIcon(weather.weathercode);
        const temp = Math.round(weather.temperature);

        return (
            <div className="flex items-center gap-2 text-white">
                <span className="text-2xl">{icon}</span>
                <span className="text-lg font-medium text-gray-900">{temp}°F</span>
            </div>
        );
    }

    return null;
}
