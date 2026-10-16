import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle"; // adjust path
import Footer from "../components/Footer"; // adjust path

export default function Explore() {
    const [searchParams] = useSearchParams();

    const [search, setSearch] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const initialSearch = searchParams.get("search") || "";
        setSearch(initialSearch);
    }, [searchParams]);

    useEffect(() => {
        fetchDestinations();
    }, []);

    const fetchDestinations = async () => {
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

            if (Array.isArray(data)) {
                setDestinations(data);
            } else if (Array.isArray(data.results)) {
                setDestinations(data.results);
            } else {
                setDestinations([]);
            }
        } catch (err) {
            console.error("Error loading destinations:", err);
            setError("Unable to load destinations.");
        } finally {
            setLoading(false);
        }
    };

    const filteredDestinations = destinations.filter((destination) => {
        const searchText = search.toLowerCase().trim();

        if (!searchText) {
            return true;
        }

        return (
            destination.name?.toLowerCase().includes(searchText) ||
            destination.country?.toLowerCase().includes(searchText) ||
            destination.region?.toLowerCase().includes(searchText)
        );
    });

    const clearSearch = () => {
        setSearch("");
    };

    if (loading) {
        return (
            <>
                <main className="min-h-screen bg-gray-100 px-5 py-12">
                    <div className="mx-auto max-w-6xl">
                        <h1 className="text-center text-4xl font-bold text-gray-800">
                            Explore Destinations
                        </h1>

                        <p className="mt-10 text-center text-gray-600">
                            Loading destinations...
                        </p>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <main className="min-h-screen bg-gray-100 px-5 py-12">
                    <div className="mx-auto max-w-6xl">
                        <h1 className="text-center text-4xl font-bold text-gray-800">
                            Explore Destinations
                        </h1>

                        <div className="mx-auto mt-10 max-w-xl rounded-2xl bg-white p-8 text-center shadow-md">
                            <p className="text-red-600">{error}</p>

                            <button
                                onClick={fetchDestinations}
                                className="mt-5 rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <main className="min-h-screen bg-gray-100 px-5 py-12">
                <div className="mx-auto max-w-6xl">
                    <SectionTitle
                        title="Explore Destinations"
                        subtitle="Discover amazing places and plan your next journey with Trip Buddy."
                    />

                    <div className="mx-auto mt-8 flex max-w-2xl gap-3">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search destinations..."
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-500"
                        />

                        {search && (
                            <button
                                onClick={clearSearch}
                                className="rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white hover:bg-gray-800"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    <div className="mt-12">
                        <h2 className="mb-6 text-3xl font-bold text-gray-800">
                            Popular Destinations
                        </h2>

                        {filteredDestinations.length === 0 ? (
                            <div className="rounded-2xl bg-white p-10 text-center shadow-md">
                                <h3 className="text-2xl font-bold text-gray-800">
                                    No destinations found
                                </h3>

                                <p className="mt-3 text-gray-600">
                                    Try searching for another destination.
                                </p>

                                <button
                                    onClick={clearSearch}
                                    className="mt-6 rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                                >
                                    View All Destinations
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredDestinations.map((destination) => (
                                    <div
                                        key={destination.id}
                                        className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div className="relative h-56 overflow-hidden">
                                            {destination.img_url ? (
                                                <img
                                                    src={destination.img_url}
                                                    alt={destination.name}
                                                    className="h-full w-full object-cover transition duration-500 hover:scale-110"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-gray-200 text-gray-500">
                                                    No Image
                                                </div>
                                            )}

                                            <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-2 text-sm font-semibold shadow">
                                                {destination.emoji}
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="text-2xl font-bold text-gray-800">
                                                {destination.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {destination.region}, {destination.country}
                                            </p>

                                            <p className="mt-4 line-clamp-3 text-gray-600">
                                                {destination.description}
                                            </p>

                                            <div className="mt-5 flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        Starting from
                                                    </p>

                                                    <p className="text-xl font-bold text-red-500">
                                                        ₹{Number(destination.price).toLocaleString("en-IN")}
                                                    </p>
                                                </div>

                                                <Link
                                                    to={`/place/${destination.id}`}
                                                    className="rounded-lg bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}