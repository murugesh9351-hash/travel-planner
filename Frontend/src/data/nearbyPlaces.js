
import ootyImage from "../assets/destinations/ooty.jpg";
import ootyLandscape from "../assets/destinations/ooty-landscape.jpg";

import kodaikanalImage from "../assets/destinations/kodaikanal.jpg";
import kodaikanalNature from "../assets/destinations/kodaikanal-nature.jpg";

import munnarImage from "../assets/destinations/munnar.jpg";
import munnarTeaEstate from "../assets/destinations/munnar-tea-estate.jpg";

const nearbyPlaces = {
    Ooty: [
        {
            id: 1,
            title: "Ooty Lake",
            image: ootyImage,
            description: "Enjoy boating and beautiful views around Ooty Lake.",
        },
        {
            id: 2,
            title: "Ooty Hills",
            image: ootyLandscape,
            description: "Experience the scenic mountain landscape of Ooty.",
        },
    ],

    Kodaikanal: [
        {
            id: 1,
            title: "Kodaikanal Lake",
            image: kodaikanalImage,
            description: "Relax beside the beautiful star-shaped Kodaikanal Lake.",
        },
        {
            id: 2,
            title: "Kodaikanal Nature",
            image: kodaikanalNature,
            description: "Explore the peaceful natural surroundings of Kodaikanal.",
        },
    ],

    Munnar: [
        {
            id: 1,
            title: "Munnar Tea Estate",
            image: munnarTeaEstate,
            description: "Explore the famous green tea plantations of Munnar.",
        },
        {
            id: 2,
            title: "Munnar",
            image: munnarImage,
            description: "Enjoy the beautiful hills and landscapes around Munnar.",
        },
    ],
};

export default nearbyPlaces;
