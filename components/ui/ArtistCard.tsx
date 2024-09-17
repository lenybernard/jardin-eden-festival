"use client";

import {motion} from "framer-motion"; // Import de Framer Motion
import {Artist} from "@/app/types";
import React, {useEffect, useState} from "react";
import {FaChevronRight} from "react-icons/fa";
import ReactPlayer from "react-player"; // Pour gérer le curseur personnalisé

export const ArtistCard = ({ artist, isEven }: { artist: Artist; isEven: boolean }) => {
    // State pour le curseur personnalisé
    const [cursorSize, setCursorSize] = useState(24);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Gestion du mouvement de la souris pour le curseur
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Fonction pour agrandir et rétrécir le curseur lors du survol
    const handleMouseEnter = () => setCursorSize(60);
    const handleMouseLeave = () => setCursorSize(24);
    const instruments = artist.artist_instrument.length > 0 && artist.artist_instrument.map((artist_instrument) => (
            <span key={artist_instrument.instrument.name} className="text-sm mr-1">
                    {artist_instrument.instrument.name}
                </span>
        ))
    const genreAndInstruments = <div>
            <p className="text-sm font-bold">
                <span className={"text-paradise"}>Genre:</span> {artist.genre} {instruments && instruments}
            </p>
    </div>

    return (
        <div>
            <motion.div
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-full mb-8"
                whileHover={{ scale: 1.05 }} // Animation Framer Motion pour le survol
                transition={{ type: "spring", stiffness: 300 }} // Paramètres de l'animation
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Image de l'artiste avec overlay pour mobile */}
                {artist.photo_url && (
                    <div className={`relative w-full md:w-1/3 h-64 md:h-auto ${isEven ? "order-1" : "order-2"}`}>
                        <img src={artist.photo_url} alt={artist.name} className="w-full h-full object-cover" />

                        {/* Overlay avec l'heure de passage */}
                        {artist.timePassage && (
                            <div className="absolute bottom-0 left-0 right-0 bg-highlight text-white text-lg font-bold py-2 px-4 text-center">
                                {artist.day.short_name} {formatTime(artist.timePassage)}
                            </div>
                        )}
                    </div>
                )}

                {/* Informations de l'artiste */}
                <div className={`w-full md:w-2/3 p-6 flex flex-col justify-between ${isEven ? "order-2" : "order-1"}`}>
                    <div className="block">
                        <h3 className="text-3xl font-semibold mb-2">{artist.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">
                            {artist.city && artist.city + ", "} {artist.country}
                        </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-4">{artist.description}</p>
                    {artist.embed && (
                        <div className={"w-4/5 m-auto"}>
                            <ReactPlayer url={artist.embed} height={"100px"}/>
                        </div>
                    )}

                    {genreAndInstruments}

                    {/* Lien d'information supplémentaire */}
                    {artist.info_link && (
                        <div className="mt-4">
                            <a
                                href={artist.info_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-paradise text-white font-bold py-2 px-4 rounded hover:bg-highlight transition-colors duration-300"
                            >
                                Découvrir <FaChevronRight className="inline-block ml-1" />
                            </a>
                        </div>
                    )}

                    {/* Crédit photo */}
                    {artist.photoCredit && (
                        <div className="mt-4 text-sm text-gray-500">
                            <p>Crédit photo: {artist.photoCredit}</p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Curseur personnalisé */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-60"
                style={{
                    width: cursorSize,
                    height: cursorSize,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    x: mousePosition.x - cursorSize / 2,
                    y: mousePosition.y - cursorSize / 2,
                }}
                animate={{
                    scale: cursorSize === 60 ? 1.1 : 1,
                    transition: { duration: 0.1 },
                }}
            />
        </div>
    );
};

function formatTime(time: string) {
    const [hours, minutes] = time.split(":");

    if (minutes === "00") {
        return `${hours}h`;
    }

    return `${hours}h${minutes}`;
}
