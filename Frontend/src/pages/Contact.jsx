
import { useState } from "react";

import SectionTitle from "../components/SectionTitle";
import Footer from "../components/Footer";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setStatus("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = formData.name.trim();
        const email = formData.email.trim();
        const message = formData.message.trim();

        if (!name || !email || !message) {
            setStatus("error");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            setStatus("error");
            return;
        }

        setStatus("success");

        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <>
            <main className="min-h-screen bg-gray-100 px-5 py-12">
                <div className="mx-auto max-w-3xl">
                    <SectionTitle
                        title="Contact Us"
                        subtitle="Have a question or need help planning your trip?"
                    />

                    <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
                        {status === "success" && (
                            <div
                                role="status"
                                className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700"
                            >
                                <p className="font-bold">Message Sent Successfully!</p>
                                <p className="mt-1 text-sm">
                                    Thank you for contacting Trip Buddy. We will get back to you
                                    soon.
                                </p>
                            </div>
                        )}

                        {status === "error" && (
                            <div
                                role="alert"
                                className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
                            >
                                <p className="font-bold">Message Error</p>
                                <p className="mt-1 text-sm">
                                    Please enter a valid name, email address, and message.
                                </p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
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
                                    placeholder="Enter your name"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                />
                            </div>

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
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="mb-2 block font-semibold text-gray-700"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message..."
                                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
