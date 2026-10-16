
import { Link, useParams } from "react-router-dom";

import tours from "../data/tours";
import Footer from "../components/Footer";

export default function TourDetails() {
    const { id } = useParams();

    const tour = tours.find((item) => item.id === Number(id));

    if (!tour) {
        return (
            <>
                <main className="flex min-h-screen items-center justify-center bg-gray-100 px-5">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Tour Not Found
                        </h1>

                        <Link
                            to="/tours"
                            className="mt-5 inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                        >
                            Back to Tours
                        </Link>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <main className="min-h-screen bg-gray-100 px-5 py-10">
                <div className="mx-auto max-w-6xl">
                    <Link
                        to="/tours"
                        className="mb-6 inline-block font-semibold text-red-500 hover:text-red-600"
                    >
                        ← Back to Tours
                    </Link>

                    <section className="overflow-hidden rounded-2xl bg-white shadow-lg">
                        <img
                            src={tour.image}
                            alt={tour.title}
                            className="h-[350px] w-full object-cover md:h-[500px]"
                        />

                        <div className="p-6 md:p-8">
                            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
                                {tour.location}
                            </p>

                            <h1 className="mt-2 text-4xl font-bold text-gray-800">
                                {tour.title}
                            </h1>

                            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                                {tour.description}
                            </p>

                            <div className="mt-6">
                                <p className="text-2xl font-bold text-gray-800">
                                    ₹{tour.price}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Starting price per person
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link
                                    to={`/booking/tour/${tour.id}`}
                                    className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                                >
                                    Book Now
                                </Link>

                                <Link
                                    to="/gallery"
                                    className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                                >
                                    Explore Gallery
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
}
