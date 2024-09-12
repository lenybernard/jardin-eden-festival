"use client";

import {motion} from "framer-motion";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import {useEffect, useState} from "react";
import {FoodInfo} from "@/app/types";
import {useSwipeable} from "react-swipeable";

export const FoodShowcaseCarousel = ({ foods }: { foods: FoodInfo[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const visibleItemsCount = 5;

    // Fonction pour avancer d'une carte
    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % foods.length);
        setIsPaused(true); // Stop autoplay
    };

    // Fonction pour revenir d'une carte
    const handlePrevious = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? foods.length - 1 : prevIndex - 1));
        setIsPaused(true); // Stop autoplay
    };

    // Autoslide toutes les 10 secondes
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                handleNext();
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [isPaused]);

    // Swipe handling for mobile devices
    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrevious,
    });

    // Calcul des items visibles dans le carousel
    const getVisibleItems = () => {
        const items = [];
        for (let i = -2; i <= 2; i++) {
            items.push((activeIndex + i + foods.length) % foods.length);
        }
        return items;
    };

    const visibleItems = getVisibleItems();

    return (
        <div
            className="relative flex flex-col items-center overflow-hidden"
            {...handlers}
        >
            {/* Boutons de navigation */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
                <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
                    onClick={handlePrevious}
                >
                    <FaChevronLeft />
                </button>
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
                <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400"
                    onClick={handleNext}
                >
                    <FaChevronRight />
                </button>
            </div>

            {/* Affichage des cartes */}
            <div className="flex items-center justify-center space-x-4 overflow-hidden w-full">
                {visibleItems.map((itemIndex, i) => {
                    const food = foods[itemIndex];
                    const isActive = i === 2; // La carte au centre est celle active
                    return (
                        <motion.div
                            key={food.id}
                            className={`relative ${
                                isActive
                                    ? "w-80 h-80 lg:w-[450px] lg:h-[550px]"
                                    : "w-40 h-40 lg:w-60 lg:h-60 opacity-50"
                            } flex-shrink-0 bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out shadow-2xl`}
                            whileHover={{ scale: isActive ? 1.05 : 1 }}
                            initial={{ opacity: 0, x: i * 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: i * -100 }}
                        >
                            <img
                                src={food.photo_url}
                                alt={food.name}
                                className="w-full h-full object-cover cursor-pointer"
                                onClick={() => setActiveIndex(itemIndex)}
                            />

                            {/* Détails de la carte active */}
                            {isActive && (
                                <motion.div
                                    className="absolute inset-0 p-4 flex flex-col justify-center bg-black bg-opacity-30 shadow-2xl text-white"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h3 className="text-4xl font-bold mb-2">{food.name}</h3>
                                    <p className="text-2xl mb-2">{food.manager}</p>
                                    <p className="text-lg">{food.description}</p>
                                    {food.info_link && (
                                        <a
                                            href={food.info_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 bg-highlight text-white py-2 px-4 rounded hover:bg-highlight-dark transition"
                                        >
                                            En savoir plus <FaChevronRight className="inline-block ml-1" />
                                        </a>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};
