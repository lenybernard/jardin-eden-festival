"use client";

import {motion} from "framer-motion";
import {useState} from "react";
import {FaChevronRight} from "react-icons/fa";
import {FoodInfo} from "@/app/types";

export const FoodShowcase = ({ foods }: { foods: FoodInfo[] }) => {
    const [selectedFood, setSelectedFood] = useState<FoodInfo | null>(null);

    // Vérification que le tableau foods n'est pas null ou undefined
    if (!foods || foods.length === 0) {
        return <p>No food items available</p>;
    }

    const handleFoodClick = (food: FoodInfo) => {
        setSelectedFood(food);
    };

    // Si un élément est sélectionné, il est mis en premier, sinon on garde l'ordre normal
    const sortedFoods = selectedFood
        ? [selectedFood, ...foods.filter(food => food !== selectedFood)]
        : foods;

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Partie gauche avec le grand titre et sous-titre */}
            <div className="md:w-1/2 flex flex-col justify-center items-center text-center bg-gray-100 p-8 rounded-lg">
                <h2 className="text-4xl font-bold">Vous allez déguster</h2>
                <p className="text-xl mt-4">Au Jardin d'Eden</p>
            </div>

            {/* Partie droite avec la grid des éléments */}
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
                {sortedFoods.map((food, index) => (
                    <motion.div
                        key={food.id}
                        className={`relative col-span-1 ${
                            selectedFood === food ? "col-span-2 row-span-2" : ""
                        }`}
                        layout
                        onClick={() => handleFoodClick(food)}
                    >
                        {/* Image en haut de la card */}
                        {food.photo_url && (
                            <img
                                src={food.photo_url}
                                alt={food.name}
                                className="w-full h-48 object-cover"
                            />
                        )}

                        {/* Contenu de la card */}
                        {selectedFood === food && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-6"
                            >
                                <h3 className="text-3xl font-semibold mb-2">{food.name}</h3>
                                <p className="text-sm text-gray-500 mb-2">Géré par : {food.manager}</p>
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
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
