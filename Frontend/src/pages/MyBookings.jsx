import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import gallery from "../data/gallery";
import tours from "../data/tours";
import nearbyPlaces from "../data/nearbyPlaces";
import Footer from "../components/Footer";

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("Please login to view your bookings.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/api/my-bookings/",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.detail || "Unable to load your bookings."
                );
                setLoading(false);
                return;
            }

            setBookings(data);
        } catch (error) {
            console.error("Unable to load bookings:", error);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    const getBookingImage = (booking) => {
        if (booking.booking_type === "Tour") {
            const tour = tours.find(
                (item) => item.id === Number(booking.itemId)
            );

            return tour?.image;
        }

        if (booking.booking_type === "Place") {
            const place = gallery.find(
                (item) => item.id === Number(booking.itemId)
            );

            return place?.image;
        }

        if (booking.booking_type === "Nearby Place") {
            for (const destination of Object.keys(nearbyPlaces)) {
                const place = nearbyPlaces[destination].find(
                    (item) => item.id === Number(booking.itemId)
                );

                if (place) {
                    return place.image;
                }
            }
        }

        return booking.destination?.img_url || null;
    };

    const getBookingTitle = (booking) => {
        return booking.destination?.name || "Travel Booking";
    };

    const cancelBooking = async (bookingId) => {
        window.alert(
            "Booking cancellation will be connected to Django in the next step."
        );
    };

    if (loading) {
        return (
            <>
                <main className="min-h-screen bg-gray-100 px-5 py-12">
                    <div className="mx-auto max-w-6xl">
                        <h1 className="text-center text-4xl font-bold text-gray-800">
                            My Bookings
                        </h1>

                        <p className="mt-10 text-center text-gray-600">
                            Loading your bookings...
                        </p>
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
                    <h1 className="text-center text-4xl font-bold text-gray-800">
                        My Bookings
                    </h1>

                    <p className="mt-3 text-center text-gray-600">
                        View and manage your Trip Buddy bookings.
                    </p>

                    {error && (
                        <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-red-50 p-6 text-center text-red-700 shadow-md">
                            <p className="font-semibold">
                                {error}
                            </p>

                            {!localStorage.getItem("token") && (
                                <Link
                                    to="/login"
                                    className="mt-5 inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    )}

                    {!error && bookings.length === 0 && (
                        <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-md">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <span className="text-2xl">
                                    ✈
                                </span>
                            </div>

                            <h2 className="mt-5 text-2xl font-bold text-gray-800">
                                No Bookings Yet
                            </h2>

                            <p className="mt-3 text-gray-600">
                                You have not made any bookings yet.
                            </p>

                            <Link
                                to="/tours"
                                className="mt-6 inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                            >
                                Explore Tours
                            </Link>
                        </div>
                    )}

                    {!error && bookings.length > 0 && (
                        <div className="mt-10 space-y-6">
                            {bookings.map((booking) => {
                                const image = getBookingImage(booking);
                                const title = getBookingTitle(booking);

                                return (
                                    <div
                                        key={booking.booking_id}
                                        className="overflow-hidden rounded-2xl bg-white shadow-md"
                                    >
                                        <div className="grid md:grid-cols-[220px_1fr]">
                                            <div>
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt={title}
                                                        className="h-full min-h-[220px] w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full min-h-[220px] items-center justify-center bg-gray-200 text-gray-500">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            <div className="p-6">
                                                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                                    <div>
                                                        <p className="text-sm font-semibold uppercase tracking-wide text-red-500">
                                                            {booking.booking_type}
                                                        </p>

                                                        <h2 className="mt-1 text-2xl font-bold text-gray-800">
                                                            {title}
                                                        </h2>
                                                    </div>

                                                    <div className="rounded-lg bg-green-50 px-4 py-3 text-center">
                                                        <p className="text-xs text-gray-500">
                                                            Booking ID
                                                        </p>

                                                        <p className="font-bold text-green-700">
                                                            {booking.booking_id}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 grid gap-4 border-t border-gray-200 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Name
                                                        </p>

                                                        <p className="mt-1 font-semibold text-gray-800">
                                                            {booking.customer_name}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Travel Date
                                                        </p>

                                                        <p className="mt-1 font-semibold text-gray-800">
                                                            {booking.travel_date}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Guests
                                                        </p>

                                                        <p className="mt-1 font-semibold text-gray-800">
                                                            {booking.guests}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-sm text-gray-500">
                                                            Total Amount
                                                        </p>

                                                        <p className="mt-1 font-bold text-red-500">
                                                            ₹
                                                            {Number(
                                                                booking.total_amount
                                                            ).toLocaleString(
                                                                "en-IN"
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex flex-col gap-4 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                                                    <span
                                                        className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-semibold ${booking.status ===
                                                                "Confirmed"
                                                                ? "bg-green-100 text-green-700"
                                                                : booking.status ===
                                                                    "Cancelled"
                                                                    ? "bg-red-100 text-red-700"
                                                                    : booking.status ===
                                                                        "Completed"
                                                                        ? "bg-blue-100 text-blue-700"
                                                                        : "bg-yellow-100 text-yellow-700"
                                                            }`}
                                                    >
                                                        {booking.status}
                                                    </span>

                                                    {booking.status !==
                                                        "Cancelled" && (
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    cancelBooking(
                                                                        booking.booking_id
                                                                    )
                                                                }
                                                                className="rounded-lg border border-red-300 px-5 py-2.5 font-semibold text-red-500 transition hover:bg-red-50"
                                                            >
                                                                Cancel Booking
                                                            </button>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}