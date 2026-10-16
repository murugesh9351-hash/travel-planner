
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function NotFound() {
    return (
        <>
            <main className="flex min-h-screen items-center justify-center bg-gray-100 px-5 py-12">
                <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
                    <p className="text-7xl font-bold text-red-500">404</p>

                    <h1 className="mt-4 text-3xl font-bold text-gray-800">
                        Page Not Found
                    </h1>

                    <p className="mt-3 text-gray-600">
                        Sorry, the page you are looking for does not exist.
                    </p>

                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>

            <Footer />
        </>
    );
}