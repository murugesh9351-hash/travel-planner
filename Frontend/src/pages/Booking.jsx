import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";

import gallery from "../data/gallery";
import tours from "../data/tours";
import nearbyPlaces from "../data/nearbyPlaces";
import Footer from "../components/Footer";

export default function Booking() {
    const { id, type, destination } = useParams();
    const [searchParams] = useSearchParams();


    const isTour = type === "tour";
    const isNearby = type === "nearby";
    const isGalleryBooking = searchParams.get("source") === "gallery";
    const isDjangoDestination =
        !isTour && !isNearby && !isGalleryBooking;

    const itemId = Number(id);

    const [djangoDestination, setDjangoDestination] = useState(null);
    const [destinationLoadError, setDestinationLoadError] = useState(false);
    const [loadingDestination, setLoadingDestination] = useState(
        isDjangoDestination
    );

    // Get destination from Django
    useEffect(() => {
        if (!isDjangoDestination) {
            return;
        }

        fetch("http://127.0.0.1:8000/api/destinations/")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch destinations");
                }

                return response.json();
            })
            .then((data) => {
                const foundDestination = data.find(
                    (item) => item.id === itemId
                );

                setDjangoDestination(foundDestination || null);
                setLoadingDestination(false);
            })
            .catch((error) => {
                console.error("Destination API error:", error);
                setDestinationLoadError(true);
                setLoadingDestination(false);
            });
    }, [itemId, isDjangoDestination]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        guests: 1,
    });

    const [bookingStatus, setBookingStatus] = useState("");

    const [bookingId, setBookingId] = useState(() => {
        const number = Math.floor(100000 + Math.random() * 900000);
        return `TB-${number}`;
    });

    const [confirmedBooking, setConfirmedBooking] = useState(null);

    let item = null;
    let parentTour = null;

    // Nearby place booking
    if (isNearby) {
        const decodedDestination = decodeURIComponent(
            destination || ""
        );

        parentTour = tours.find(
            (tour) => tour.title === decodedDestination
        );

        const places = nearbyPlaces[decodedDestination] || [];

        item = places.find(
            (place) => place.id === itemId
        );
    }

    // Tour booking
    else if (isTour) {
        item = tours.find(
            (tour) => tour.id === itemId
        );
    }

    // Django destination booking
    else if (djangoDestination) {
        item = {
            id: djangoDestination.id,
            title: djangoDestination.name,
            image: djangoDestination.img_url,
            category: djangoDestination.region,
            price: djangoDestination.price,
            duration: djangoDestination.duration,
            country: djangoDestination.country,
            description: djangoDestination.description,
        };
    }

    // Old gallery place booking
    else if (!loadingDestination && isGalleryBooking) {
        item = gallery.find(
            (place) => place.id === itemId
        );
    }

    const [todayString] = new Date()
        .toISOString()
        .split("T");

    const pricePerPerson = Number(
        item?.price || 0
    );

    const guests = Number(
        formData.guests || 1
    );

    const totalAmount =
        pricePerPerson * guests;

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setBookingStatus("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const name = formData.name.trim();
        const email = formData.email.trim();
        const phone = formData.phone.trim();
        const date = formData.date;
        const guestCount = Number(formData.guests);

        if (!name || !email || !phone || !date) {
            setBookingStatus("error");
            return;
        }

        if (guestCount < 1) {
            setBookingStatus("error");
            return;
        }

        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {
            setBookingStatus("error");
            return;
        }

        if (phone.length < 10) {
            setBookingStatus("error");
            return;
        }

        const selectedDate = new Date(
            `${date}T00:00:00`
        );

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setBookingStatus("error");
            return;
        }

        /*
         * Django destination booking
         *
         * If the user is logged in, send the authentication
         * token so Django can connect the booking to that user.
         */
        if (
            isDjangoDestination &&
            djangoDestination
        ) {
            setBookingStatus("submitting");

            try {
                const token =
                    localStorage.getItem("token");

                const headers = {
                    "Content-Type":
                        "application/json",
                };

                if (token) {
                    headers.Authorization =
                        `Token ${token}`;
                }

                const response = await fetch(
                    "http://127.0.0.1:8000/api/bookings/",
                    {
                        method: "POST",
                        headers,
                        body: JSON.stringify({
                            destination:
                                djangoDestination.id,

                            customer_name:
                                name,

                            email,

                            phone,

                            travel_date:
                                date,

                            guests:
                                guestCount,

                            price_per_person:
                                pricePerPerson,

                            total_amount:
                                totalAmount,

                            duration:
                                item.duration ||
                                "Not specified",

                            booking_type:
                                "Django Destination",
                        }),
                    }
                );

                const result =
                    await response.json();

                if (!response.ok) {
                    console.error(
                        "Booking API error:",
                        result
                    );

                    throw new Error(
                        "Booking API request failed."
                    );
                }

                setBookingId(
                    result.booking_id
                );

                setConfirmedBooking(
                    result
                );

                setBookingStatus(
                    "success"
                );
            } catch (error) {
                console.error(
                    "Unable to save booking to Django:",
                    error
                );

                setBookingStatus(
                    "api-error"
                );
            }

            return;
        }

        /*
         * Existing localStorage booking system
         * for Tours, Gallery places and Nearby places.
         */
        const newBooking = {
            bookingId,

            itemId: item.id,

            title: item.title,

            type: isDjangoDestination
                ? "Django Destination"
                : isNearby
                    ? "Nearby Place"
                    : isTour
                        ? "Tour"
                        : "Place",

            name,

            email,

            phone,

            date,

            guests: guestCount,

            pricePerPerson,

            totalAmount,

            duration:
                item.duration || "",

            createdAt:
                new Date().toISOString(),
        };

        try {
            const existingBookings =
                JSON.parse(
                    localStorage.getItem(
                        "tripBuddyBookings"
                    )
                ) || [];

            localStorage.setItem(
                "tripBuddyBookings",
                JSON.stringify([
                    ...existingBookings,
                    newBooking,
                ])
            );

            setBookingStatus(
                "success"
            );
        } catch (error) {
            console.error(
                "Unable to save booking:",
                error
            );

            setBookingStatus(
                "storage-error"
            );
        }
    };

    // Loading Django destination
    if (loadingDestination) {
        return (
            <>
                <main className="flex min-h-screen items-center justify-center bg-gray-100 px-5">
                    <div className="text-center">
                        <p className="text-xl font-semibold text-gray-700">
                            Loading booking details...
                        </p>
                    </div>
                </main>

                <Footer />
            </>
        );
    }

    // Destination not found
    if (!item) {
        return (
            <>
                <main className="flex min-h-screen items-center justify-center bg-gray-100 px-5 py-12">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <span className="text-3xl text-red-500">
                                !
                            </span>
                        </div>

                        <h1 className="mt-5 text-3xl font-bold text-gray-800">
                            Booking Error
                        </h1>

                        <p className="mt-3 text-gray-600">
                            {destinationLoadError
                                ? "Unable to load destination details from the server. Please try again."
                                : "The selected destination could not be found."}
                        </p>

                        <Link
                            to="/explore"
                            className="mt-6 inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                        >
                            Back to Explore
                        </Link>

                    </div>
                </main>

                <Footer />
            </>
        );
    }

    let backPath = "/gallery";

    if (isDjangoDestination) {
        backPath = `/place/${item.id}`;
    }

    if (isTour) {
        backPath = `/tour/${item.id}`;
    }

    if (isNearby && parentTour) {
        backPath = `/tour/${parentTour.id}`;
    }

    // Booking confirmed
    if (bookingStatus === "success") {
        return (
            <>
                <main className="flex min-h-screen items-center justify-center bg-gray-100 px-5 py-12">

                    <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">

                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <span className="text-4xl text-green-600">
                                ✓
                            </span>
                        </div>

                        <h1 className="mt-6 text-3xl font-bold text-gray-800">
                            Booking Confirmed!
                        </h1>

                        <p className="mt-3 text-gray-600">
                            Your booking for{" "}
                            <span className="font-semibold text-gray-800">
                                {item.title}
                            </span>{" "}
                            has been confirmed.
                        </p>

                        {/* Booking ID */}
                        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">

                            <p className="text-sm text-gray-600">
                                Booking ID
                            </p>

                            <p className="mt-1 text-2xl font-bold tracking-wider text-green-700">
                                {bookingId}
                            </p>

                        </div>

                        {/* Booking Summary */}
                        <div className="mt-4 rounded-xl bg-gray-50 p-5 text-left">

                            <div className="flex justify-between gap-4">
                                <span className="text-gray-600">
                                    Customer Name
                                </span>

                                <span className="font-semibold text-gray-800">
                                    {confirmedBooking?.customer_name ||
                                        formData.name}
                                </span>
                            </div>

                            <div className="mt-3 flex justify-between gap-4">
                                <span className="text-gray-600">
                                    Destination
                                </span>

                                <span className="font-semibold text-gray-800">
                                    {item.title}
                                </span>
                            </div>

                            {item.duration && (
                                <div className="mt-3 flex justify-between gap-4">
                                    <span className="text-gray-600">
                                        Duration
                                    </span>

                                    <span className="font-semibold text-gray-800">
                                        {confirmedBooking?.duration ||
                                            item.duration}
                                    </span>
                                </div>
                            )}

                            <div className="mt-3 flex justify-between gap-4">
                                <span className="text-gray-600">
                                    Travel Date
                                </span>

                                <span className="font-semibold text-gray-800">
                                    {confirmedBooking?.travel_date ||
                                        formData.date}
                                </span>
                            </div>

                            <div className="mt-3 flex justify-between gap-4">
                                <span className="text-gray-600">
                                    Guests
                                </span>

                                <span className="font-semibold text-gray-800">
                                    {confirmedBooking?.guests ??
                                        guests}
                                </span>
                            </div>

                            <div className="mt-4 flex justify-between gap-4 border-t border-gray-200 pt-4">

                                <span className="font-bold text-gray-800">
                                    Total Amount
                                </span>

                                <span className="text-xl font-bold text-red-500">
                                    ₹
                                    {Number(
                                        confirmedBooking?.total_amount ??
                                        totalAmount
                                    ).toLocaleString("en-IN")}
                                </span>

                            </div>

                        </div>

                        <p className="mt-4 text-sm text-gray-500">
                            {confirmedBooking
                                ? "Your booking has been saved to the Trip Buddy database."
                                : "Your booking has been saved in this browser."}
                        </p>

                        <div className="mt-7 flex flex-wrap justify-center gap-3">

                            <Link
                                to="/"
                                className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                            >
                                Go Home
                            </Link>

                            <Link
                                to="/explore"
                                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100"
                            >
                                Explore More
                            </Link>

                            {confirmedBooking && (
                                <Link
                                    to="/my-bookings"
                                    className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
                                >
                                    My Bookings
                                </Link>
                            )}

                        </div>

                    </div>

                </main>

                <Footer />
            </>
        );
    }

    return (
        <>
            <main className="min-h-screen bg-gray-100 px-5 py-10">

                <div className="mx-auto max-w-5xl">

                    {/* Back */}
                    <Link
                        to={backPath}
                        className="mb-6 inline-block font-semibold text-red-500 hover:text-red-600"
                    >
                        ← Back to {item.title}
                    </Link>

                    <div className="grid overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-2">

                        {/* Image */}
                        <div className="bg-gray-100">

                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full min-h-[450px] w-full object-cover"
                                />
                            ) : (
                                <div className="flex min-h-[450px] items-center justify-center">
                                    <span className="text-9xl">
                                        {djangoDestination?.emoji ||
                                            "📍"}
                                    </span>
                                </div>
                            )}

                        </div>

                        {/* Form */}
                        <div className="p-6 md:p-8">

                            {/* Category / Region */}
                            <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
                                {isTour
                                    ? item.location
                                    : isNearby
                                        ? "Nearby Attraction"
                                        : item.category}
                            </p>

                            {/* Heading */}
                            <h1 className="mt-2 text-3xl font-bold text-gray-800">
                                Book Your{" "}
                                {isDjangoDestination
                                    ? "Trip"
                                    : isTour
                                        ? "Tour"
                                        : "Trip"}
                            </h1>

                            {/* Destination */}
                            <h2 className="mt-2 text-xl font-semibold text-gray-700">
                                {item.title}
                            </h2>

                            {/* Duration */}
                            {item.duration && (
                                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                                    <p className="text-sm text-gray-500">
                                        Trip Duration
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-gray-800">
                                        {item.duration}
                                    </p>
                                </div>
                            )}

                            {/* Price */}
                            <div className="mt-4 rounded-xl bg-gray-50 p-4">

                                <p className="text-sm text-gray-500">
                                    Price per person
                                </p>

                                <p className="text-2xl font-bold text-gray-800">
                                    ₹
                                    {pricePerPerson.toLocaleString(
                                        "en-IN"
                                    )}
                                </p>

                            </div>

                            {/* Validation Error */}
                            {bookingStatus === "error" && (
                                <div
                                    role="alert"
                                    className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                                >
                                    <p className="font-bold">
                                        Booking Error
                                    </p>

                                    <p className="mt-1 text-sm">
                                        Please enter valid details, a valid
                                        phone number and email, and choose a
                                        future travel date.
                                    </p>
                                </div>
                            )}

                            {/* Storage Error */}
                            {bookingStatus === "storage-error" && (
                                <div
                                    role="alert"
                                    className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                                >
                                    <p className="font-bold">
                                        Booking Error
                                    </p>

                                    <p className="mt-1 text-sm">
                                        Your booking could not be saved in
                                        this browser. Please try again.
                                    </p>
                                </div>
                            )}

                            {/* API Error */}
                            {bookingStatus === "api-error" && (
                                <div
                                    role="alert"
                                    className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                                >
                                    <p className="font-bold">
                                        Booking Error
                                    </p>

                                    <p className="mt-1 text-sm">
                                        Unable to complete your booking. Please
                                        try again.
                                    </p>
                                </div>
                            )}

                            {/* Booking Form */}
                            <form
                                onSubmit={handleSubmit}
                                className="mt-6 space-y-5"
                            >

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="mb-2 block font-semibold text-gray-700"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-2 block font-semibold text-gray-700"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block font-semibold text-gray-700"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter your phone number"
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                    />
                                </div>

                                {/* Date */}
                                <div>
                                    <label
                                        htmlFor="date"
                                        className="mb-2 block font-semibold text-gray-700"
                                    >
                                        Travel Date
                                    </label>

                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        min={todayString}
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                    />
                                </div>

                                {/* Guests */}
                                <div>
                                    <label
                                        htmlFor="guests"
                                        className="mb-2 block font-semibold text-gray-700"
                                    >
                                        Number of Guests
                                    </label>

                                    <input
                                        id="guests"
                                        name="guests"
                                        type="number"
                                        min="1"
                                        value={formData.guests}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                    />
                                </div>

                                {/* Total */}
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                                    <div className="flex justify-between text-gray-600">
                                        <span>
                                            Price per person
                                        </span>

                                        <span>
                                            ₹
                                            {pricePerPerson.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>
                                    </div>

                                    <div className="mt-2 flex justify-between text-gray-600">
                                        <span>
                                            Guests
                                        </span>

                                        <span>
                                            {guests}
                                        </span>
                                    </div>

                                    <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">

                                        <span className="text-xl font-bold text-gray-800">
                                            Total Amount
                                        </span>

                                        <span className="text-2xl font-bold text-red-500">
                                            ₹
                                            {totalAmount.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>

                                    </div>

                                </div>

                                {/* Confirm */}
                                <button
                                    type="submit"
                                    disabled={
                                        bookingStatus ===
                                        "submitting"
                                    }
                                    className="w-full rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                                >
                                    {bookingStatus ===
                                        "submitting"
                                        ? "Submitting..."
                                        : "Confirm Booking"}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </main>

            <Footer />
        </>
    );


}
