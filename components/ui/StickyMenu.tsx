"use client";

import {useEffect, useState} from "react";
import {League_Gothic} from 'next/font/google';
import {useSmoothScroll} from "@/hooks/useSmoothScroll";
import {FestivalInfo} from "@/app/types"; // Importer le hook
import {FaBars, FaTimes} from "react-icons/fa"; // Importer les icônes de menu hamburger

const leagueGothic = League_Gothic({
    weight: '400',
    subsets: ['latin'],
});

export const StickyMenu = ({ festivalInfo }: { festivalInfo: FestivalInfo }) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // État pour gérer l'ouverture du menu mobile
    const scrollToContent = useSmoothScroll(); // Utilisation du hook personnalisé

    // Fonction pour faire défiler tout en haut de la page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // Fonction pour vérifier le scroll et activer le sticky menu
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) { // Change the number to adjust when it should stick
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Fonction pour gérer l'ouverture/fermeture du menu mobile
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav
            className={`${
                isSticky ? "fixed top-0 left-0 right-0 bg-paradise shadow-lg" : "relative"
            } transition-all duration-300 z-50 py-4`}
        >
            <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
                {/* Titre du festival avec un onClick pour scroller en haut */}
                <div
                    onClick={scrollToTop} // Ajout de la fonction pour scroller en haut
                    className={`${leagueGothic.className} uppercase outline-title outline-title-lite text-5xl cursor-pointer`}
                >
                    {festivalInfo.event_name}
                </div>

                {/* Icône du menu hamburger pour mobile */}
                <div className="lg:hidden text-3xl text-gray-700 cursor-pointer" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* Menu de navigation pour les grands écrans */}
                <div className="hidden lg:flex space-x-6 text-lg">
                    <a
                        href="#programme"
                        className="text-gray-700 hover:text-highlight"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToContent("programme");
                        }}
                    >
                        Programme
                    </a>
                    <a
                        href="#food-and-drink"
                        className="text-gray-700 hover:text-highlight"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToContent("food-and-drink");
                        }}
                    >
                        À boire et à manger
                    </a>
                    <a
                        href="#informations"
                        className="text-gray-700 hover:text-highlight"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToContent("informations");
                        }}
                    >
                        Infos pratiques
                    </a>
                    <a
                        href="#contact"
                        className="text-gray-700 hover:text-highlight"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToContent("contact");
                        }}
                    >
                        Contact
                    </a>
                    {festivalInfo.store_url && (
                        <a href={festivalInfo.store_url} target="_blank"
                           className="bg-highlight text-white py-2 px-4 rounded hover:bg-highlight-light transition"
                        >
                            {festivalInfo.store_button_label ?? 'Pré-vente'}
                        </a>
                    )}
                </div>
            </div>

            {/* Menu mobile qui apparaît lorsqu'il est ouvert */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-paradise py-4 px-8 space-y-4 text-lg text-center">
                    <a
                        href="#programme"
                        className="block text-gray-700 hover:text-highlight"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToContent("programme");
                            toggleMobileMenu(); // Fermer le menu après le clic
                        }}
                    >
                        Programme
                    </a>
                    <a
                        href="#food-and-drink"
                        className="block text-gray-700 hover:text-highlight"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToContent("food-and-drink");
                            toggleMobileMenu(); // Fermer le menu après le clic
                        }}
                    >
                        À boire et à manger
                    </a>
                    <a
                        href="#informations"
                        className="block text-gray-700 hover:text-highlight"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToContent("informations");
                            toggleMobileMenu(); // Fermer le menu après le clic
                        }}
                    >
                        Infos pratiques
                    </a>
                    <a
                        href="#contact"
                        className="block text-gray-700 hover:text-highlight"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToContent("contact");
                            toggleMobileMenu(); // Fermer le menu après le clic
                        }}
                    >
                        Contact
                    </a>
                    {festivalInfo.store_url && (
                        <a href={festivalInfo.store_url} target="_blank"
                           className="block bg-highlight text-white py-2 px-4 rounded hover:bg-highlight-light transition"
                        >
                            {festivalInfo.store_button_label ?? 'Pré-vente'}
                        </a>
                    )}
                </div>
            )}
        </nav>
    );
};
