import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer"; // adjust path

export default function PlaceDetails() {
    const { id } = useParams();

    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDestination();
    }, [id]);

    const fetchDestination = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://127.0.0.1:8000/api/destinations/"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch destinations");
            }

            const data = await response.json();

            const destinations = Array.isArray(data)
                ? data
                : Array.isArray(data.results)
                    ? data.results
                    : [];

            const foundDestination = destinations.find(
                (item) => String(item.id) === String(id)
            );

            if (!foundDestination) {
                setError("Destination not found.");
                return;
            }

            setDestination(foundDestination);
        } catch (err) {
            console.error("Error loading destination:", err);
            setError("Unable to load destination.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <main className="min-h-screen bg-gray-100 px-5 py-12">
                    <div className="mx-auto max-w-5xl">
                        <p className="text-center text-gray-600">
                            Loading destination...
                        </p>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (error || !destination) {
        return (
            <>
                <main className="min-h-screen bg-gray-100 px-5 py-12">
                    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow-md">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Destination Not Found
                        </h1>

                        <p className="mt-4 text-gray-600">
                            {error || "Destination could not be found."}
                        </p>

                        <Link
                            to="/explore"
                            className="mt-6 inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold text-white"
                        >
                            Back to Explore
                        </Link>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    const attractions = destination.attractions
        ? destination.attractions
            .split(/\r?\n/)
            .map((item) => item.trim())
            .filter(Boolean)
        : [];

    return (
        <>
            <main className="min-h-screen bg-gray-100">
                <div className="relative h-[400px] overflow-hidden">
                    {destination.img_url ? (
                        <img
                            src={destination.img_url}
                            alt={destination.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gray-300">
                            No Image
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                        <div>
                            <div className="text-5xl">{destination.emoji}</div>

                            <h1 className="mt-3 text-5xl font-bold">
                                {destination.name}
                            </h1>

                            <p className="mt-3 text-lg">
                                {destination.region}, {destination.country}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-5xl px-5 py-12">
                    <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

                        <div className="space-y-8">

                            <section className="rounded-2xl bg-white p-7 shadow-md">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    About {destination.name}
                                </h2>

                                <p className="mt-4 leading-7 text-gray-600">
                                    {destination.description}
                                </p>
                            </section>

                            {attractions.length > 0 && (
                                <section className="rounded-2xl bg-white p-7 shadow-md">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Top Attractions
                                    </h2>

                                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                        {attractions.map((attraction, index) => (
                                            <div
                                                key={index}
                                                className="rounded-lg bg-gray-50 p-4 font-medium text-gray-700"
                                            >
                                                📍 {attraction}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {destination.famous_for && (
                                <section className="rounded-2xl bg-white p-7 shadow-md">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Famous For
                                    </h2>

                                    <p className="mt-4 leading-7 text-gray-600">
                                        {destination.famous_for}
                                    </p>
                                </section>
                            )}

                            {destination.travel_tips && (
                                <section className="rounded-2xl bg-white p-7 shadow-md">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Travel Tips
                                    </h2>

                                    <p className="mt-4 leading-7 text-gray-600">
                                        {destination.travel_tips}
                                    </p>
                                </section>
                            )}

                        </div>

                        <aside>
                            <div className="sticky top-6 rounded-2xl bg-white p-7 shadow-md">

                                <p className="text-sm text-gray-500">
                                    Starting from
                                </p>

                                <p className="mt-1 text-3xl font-bold text-red-500">
                                    ₹{Number(destination.price).toLocaleString("en-IN")}
                                </p>

                                {destination.duration && (
                                    <p className="mt-2 text-gray-600">
                                        🕒 {destination.duration}
                                    </p>
                                )}

                                {destination.best_time && (
                                    <div className="mt-5 rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm font-semibold text-gray-700">
                                            Best Time to Visit
                                        </p>

                                        <p className="mt-1 text-gray-600">
                                            {destination.best_time}
                                        </p>
                                    </div>
                                )}

                                <Link
                                    to={`/booking/${destination.id}`}
                                    className="mt-6 block w-full rounded-lg bg-red-500 px-6 py-3 text-center font-bold text-white hover:bg-red-600"
                                >
                                    Book This Place
                                </Link>

                                <Link
                                    to="/explore"
                                    className="mt-3 block w-full rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700"
                                >
                                    Back to Explore
                                </Link>

                            </div>
                        </aside>

                    </div>

                    <div className="mt-8 rounded-xl bg-white p-5 text-center text-sm text-gray-500 shadow-sm">
                        Image used for travel information and destination preview.
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}