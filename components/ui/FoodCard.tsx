"use client";

import {motion} from "framer-motion";
import {FaChevronRight} from "react-icons/fa";
import {FoodInfo} from "@/app/types";

export const FoodCard = ({ food, isEven }: { food: FoodInfo; isEven: boolean }) => {
    return (
        <motion.div
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-full mb-8"
            whileHover={{ scale: 1.05 }} // Animation Framer Motion pour le survol
            transition={{ type: "spring", stiffness: 300 }} // Paramètres de l'animation
        >
            {/* Image de l'élément de restauration avec overlay pour mobile */}
            {food.photo_url && (
                <div className={`relative w-full md:w-1/3 h-64 md:h-auto ${isEven ? "order-1" : "order-2"}`}>
                    <img src={food.photo_url} alt={food.name} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Informations de la restauration */}
            <div className={`w-full md:w-2/3 p-6 flex flex-col justify-between ${isEven ? "order-2" : "order-1"}`}>
                <div className="block">
                    <h3 className="text-3xl font-semibold mb-2">{food.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Géré par : {food.manager}</p>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4">{food.description}</p>

                {/* Lien externe pour plus d'infos */}
                {food.info_link && (
                    <div className="mt-4">
                        <a
                            href={food.info_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-paradise text-white font-bold py-2 px-4 rounded hover:bg-highlight transition-colors duration-300"
                        >
                            En savoir plus <FaChevronRight className="inline-block ml-1" />
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};
