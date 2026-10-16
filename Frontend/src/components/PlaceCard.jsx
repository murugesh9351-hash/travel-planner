
import { Link } from "react-router-dom";

export default function PlaceCard({ place, linkTo }) {
    const card = (
        <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <img
                src={place.image}
                alt={place.title}
                className="h-56 w-full object-cover"
            />

            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">
                    {place.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    {place.category}
                </p>
            </div>
        </div>
    );

    if (linkTo) {
        return <Link to={linkTo}>{card}</Link>;
    }

    return card;
}
