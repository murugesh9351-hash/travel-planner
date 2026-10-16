
import { Link } from "react-router-dom";
import {
    Camera,
    Compass,
    MapPin,
    ShieldCheck,
    TreePine,
    WalletCards,
} from "lucide-react";

import HeroBanner from "../components/HeroBanner";
import SectionTitle from "../components/SectionTitle";
import Footer from "../components/Footer";
import tours from "../data/tours";
import gallery from "../data/gallery";

export default function Home() {
    const categories = [
        {
            title: "Beaches",
            description: "Relax, enjoy the coast, and discover beautiful beaches.",
            icon: <MapPin size={32} />,
            category: "Beach",
        },
        {
            title: "Heritage",
            description: "Explore forts, monuments, temples, and historic places.",
            icon: <Compass size={32} />,
            category: "Heritage",
        },
        {
            title: "Spiritual",
            description: "Discover famous spiritual and religious destinations.",
            icon: <TreePine size={32} />,
            category: "Spiritual",
        },
        {
            title: "Wildlife",
            description: "Explore tiger reserves, forests, parks, and sanctuaries.",
            icon: <Camera size={32} />,
            category: "Wildlife",
        },
    ];

    const features = [
        {
            title: "Easy Planning",
            description:
                "Find destinations, explore places, and organize your trip from one website.",
            icon: <Compass size={30} />,
        },
        {
            title: "Trusted Booking",
            description:
                "Book tours and attractions with a simple and clear booking process.",
            icon: <ShieldCheck size={30} />,
        },
        {
            title: "Affordable Trips",
            description:
                "See the price per person and calculate your total trip amount easily.",
            icon: <WalletCards size={30} />,
        },
    ];

    return (
        <>
            <main>
                <HeroBanner />

                {/* Welcome */}
                <section className="bg-white px-5 py-16">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-500">
                            Welcome to Trip Buddy
                        </p>

                        <h1 className="text-4xl font-bold text-gray-800 md:text-5xl">
                            Discover Your Next Adventure
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                            Explore beautiful destinations, discover amazing attractions,
                            experience local culture, and plan memorable journeys across
                            India with Trip Buddy.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                to="/explore"
                                className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                            >
                                Explore Places
                            </Link>

                            <Link
                                to="/tours"
                                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                            >
                                View Tours
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Popular Destinations */}
                <section className="bg-gray-100 px-5 py-16">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle
                            title="Popular Destinations"
                            subtitle="Explore some of our featured travel destinations."
                        />

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {tours.slice(0, 6).map((tour) => (
                                <div
                                    key={tour.id}
                                    className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <Link to={`/tour/${tour.id}`} className="block overflow-hidden">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            loading="lazy"
                                            className="h-56 w-full object-cover transition duration-300 hover:scale-105"
                                        />
                                    </Link>

                                    <div className="p-5">
                                        <p className="text-sm font-semibold text-red-500">
                                            {tour.location}
                                        </p>

                                        <h3 className="mt-1 text-2xl font-bold text-gray-800">
                                            {tour.title}
                                        </h3>

                                        <p className="mt-3 text-gray-600">
                                            {tour.description}
                                        </p>

                                        <div className="mt-5 flex items-center justify-between gap-3">
                                            <span className="font-bold text-gray-800">
                                                ₹{Number(tour.price).toLocaleString("en-IN")}
                                            </span>

                                            <Link
                                                to={`/tour/${tour.id}`}
                                                className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
                                            >
                                                View Tour
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                to="/tours"
                                className="inline-block rounded-lg border border-red-500 px-6 py-3 font-semibold text-red-500 transition hover:bg-red-50"
                            >
                                View All Tours
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="bg-white px-5 py-16">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle
                            title="Explore by Category"
                            subtitle="Choose the type of experience you want."
                        />

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {categories.map((category) => (
                                <Link
                                    key={category.title}
                                    to={`/gallery?category=${category.category}`}
                                    className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="flex h-44 items-center justify-center bg-gray-100">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                                            {category.icon}
                                        </div>
                                    </div>

                                    <div className="p-5 text-center">
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            {category.title}
                                        </h3>

                                        <p className="mt-2 text-gray-600">
                                            {category.description}
                                        </p>

                                        <span className="mt-4 inline-block font-semibold text-red-500">
                                            Explore →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Trip Buddy */}
                <section className="bg-gray-100 px-5 py-16">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle
                            title="Why Choose Trip Buddy?"
                            subtitle="Everything you need for a simple travel-planning experience."
                        />

                        <div className="grid gap-6 md:grid-cols-3">
                            {features.map((feature) => (
                                <div
                                    key={feature.title}
                                    className="rounded-2xl bg-white p-7 text-center shadow-md"
                                >
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                                        {feature.icon}
                                    </div>

                                    <h3 className="mt-5 text-xl font-bold text-gray-800">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 leading-7 text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Travel Gallery */}
                <section className="bg-white px-5 py-16">
                    <div className="mx-auto max-w-7xl">
                        <SectionTitle
                            title="Travel Gallery"
                            subtitle="Take a visual journey through some amazing places."
                        />

                        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                            {gallery.slice(0, 8).map((place) => (
                                <Link
                                    key={place.id}
                                    to={`/place/${place.id}?source=gallery`}
                                    className="group relative overflow-hidden rounded-xl"
                                >
                                    <img
                                        src={place.image}
                                        alt={place.title}
                                        loading="lazy"
                                        className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-x-0 bottom-0 bg-black/60 p-3">
                                        <p className="truncate font-semibold text-white">
                                            {place.title}
                                        </p>

                                        <p className="text-xs text-gray-200">
                                            {place.category}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                to="/gallery"
                                className="inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                            >
                                View Full Gallery
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-gray-900 px-5 py-16">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="text-3xl font-bold text-white md:text-4xl">
                            Ready to Plan Your Next Trip?
                        </h2>

                        <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-300">
                            Explore destinations, discover tourist places, compare tours,
                            and make your booking with Trip Buddy.
                        </p>

                        <Link
                            to="/explore"
                            className="mt-8 inline-block rounded-lg bg-red-500 px-7 py-3 font-semibold text-white transition hover:bg-red-600"
                        >
                            Start Exploring
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}