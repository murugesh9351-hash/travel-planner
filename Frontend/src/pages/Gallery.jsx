
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import gallery from "../data/gallery";
import PlaceCard from "../components/PlaceCard";
import Footer from "../components/Footer";

export default function Gallery() {
    const [searchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = ["All", "Beach", "Heritage", "Spiritual", "Wildlife"];

    useEffect(() => {
        const categoryFromUrl = searchParams.get("category");

        if (categories.includes(categoryFromUrl)) {
            setActiveCategory(categoryFromUrl);
        } else {
            setActiveCategory("All");
        }
    }, [searchParams]);

    const filteredGallery =
        activeCategory === "All"
            ? gallery
            : gallery.filter((place) => place.category === activeCategory);

    return (
        <>
            <main className="min-h-screen bg-gray-100 px-5 py-12">
                <div className="mx-auto max-w-7xl">
                    <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
                        Travel Gallery
                    </h1>

                    <div className="mb-10 flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full px-5 py-2.5 font-semibold transition ${activeCategory === category
                                        ? "bg-red-500 text-white"
                                        : "bg-white text-gray-700 shadow-sm hover:bg-gray-200"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredGallery.map((place) => (
                            <PlaceCard
                                key={place.id}
                                place={place}
                                linkTo={`/place/${place.id}?source=gallery`}
                            />
                        ))}
                    </div>

                    {filteredGallery.length === 0 && (
                        <p className="py-10 text-center text-gray-500">
                            No places found in this category.
                        </p>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
};