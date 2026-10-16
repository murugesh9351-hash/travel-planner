import { useState } from "react";
import { useNavigate } from "react-router-dom";

import kodaikanalNature from "../assets/destinations/kodaikanal-nature.jpg";
import munnarTeaEstate from "../assets/destinations/munnar-tea-estate.jpg";
import ootyLandscape from "../assets/destinations/ooty-landscape.jpg";

export default function HeroBanner() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();

        const searchText = search.trim();

        if (!searchText) {
            return;
        }

        navigate(`/explore?search=${encodeURIComponent(searchText)}`);
    };

    return (
        <section className="relative">
            {/* Background Images */}
            <div className="grid h-[500px] grid-cols-1 md:grid-cols-3">
                <div className="relative overflow-hidden">
                    <img
                        src={ootyLandscape}
                        alt="Ooty landscape"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute bottom-6 left-6">
                        <h2 className="text-3xl font-bold text-white">Ooty</h2>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <img
                        src={kodaikanalNature}
                        alt="Kodaikanal nature"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute bottom-6 left-6">
                        <h2 className="text-3xl font-bold text-white">
                            Kodaikanal
                        </h2>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <img
                        src={munnarTeaEstate}
                        alt="Munnar tea estate"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />

                    <div className="absolute bottom-6 left-6">
                        <h2 className="text-3xl font-bold text-white">Munnar</h2>
                    </div>
                </div>
            </div>

            {/* Transparent Search Area */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-white">
                        Trip Buddy
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
                        Where Do You Want to Go?
                    </h1>

                    <p className="mt-3 text-sm text-white drop-shadow-md md:text-base">
                        Search destinations and tourist places across India.
                    </p>

                    <form
                        onSubmit={handleSearch}
                        className="mx-auto mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
                    >
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search Ooty, Beach, Wildlife..."
                            className="min-w-0 flex-1 rounded-lg border border-white/70 bg-white/90 px-4 py-3 text-gray-800 outline-none focus:border-red-500"
                        />

                        <button
                            type="submit"
                            className="rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}