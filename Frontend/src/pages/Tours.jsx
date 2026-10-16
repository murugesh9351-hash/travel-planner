
import { Link } from "react-router-dom";

import SectionTitle from "../components/SectionTitle";
import Footer from "../components/Footer";
import tours from "../data/tours";

export default function Tours() {
    return (
        <>
            <main className="min-h-screen bg-gray-100 px-5 py-12">
                <div className="mx-auto max-w-7xl">
                    <SectionTitle
                        title="Popular Tours"
                        subtitle="Explore some of our best travel destinations."
                    />

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {tours.map((tour) => (
                            <div
                                key={tour.id}
                                className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <img
                                    src={tour.image}
                                    alt={tour.title}
                                    className="h-64 w-full object-cover"
                                />

                                <div className="p-5">
                                    <p className="text-sm font-semibold text-red-500">
                                        {tour.location}
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-gray-800">
                                        {tour.title}
                                    </h2>

                                    <p className="mt-3 text-gray-600">
                                        {tour.description}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-800">
                                            ₹{tour.price}
                                        </span>

                                        <Link
                                            to={`/tour/${tour.id}`}
                                            className="rounded-lg bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
                                        >
                                            View Tour
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
