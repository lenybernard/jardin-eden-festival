"use client";

import {League_Gothic} from 'next/font/google'; // Importer League Gothic depuis Google Fonts
import {Artist, FestivalInfo} from "@/app/types";
import {FaChevronDown} from 'react-icons/fa';
import {motion, useScroll, useTransform} from 'framer-motion';
import {useEffect, useState} from 'react';
import {Time} from "@/components/utils/time";
import {useSmoothScroll} from "@/hooks/useSmoothScroll";

// Charger la police League Gothic
const leagueGothic = League_Gothic({
    weight: '400',
    subsets: ['latin'],
});

type HeaderProps = {
    festival_info: FestivalInfo;
};

export default function Header({ festival_info }: HeaderProps) {
    // Sur mobile, le titre sera sans éclatement et plus petit
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const eventNameWithLineBreaks = isMobile
        ? festival_info.event_name
        : festival_info.event_name.split(' ').map((word, index) => (
            <span key={index} className="block leading-none">{word}</span> // Utilisation de block pour éclater le texte
        ));

    const scrollToContent = useSmoothScroll();


    // Parallax scroll effect setup avec useScroll
    const { scrollY } = useScroll();  // Capture la position de défilement
    const yTitle = useTransform(scrollY, [0, 500], [0, -200]);  // Plus de décalage pour augmenter l'effet parallax

    // States pour le suivi du curseur et l'overlay
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorSize, setCursorSize] = useState(24);  // Taille par défaut du curseur
    const [isHovered, setIsHovered] = useState(false);  // État pour suivre si le bouton est survolé
    const [isClicked, setIsClicked] = useState(false);  // État pour suivre le clic

    // Gestion du mouvement de la souris
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Fonction de gestion du clic
    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 200);  // Réinitialiser après 200ms pour revenir à la taille normale
    };

    // Configuration de l'animation de l'image de fond (ralentie)
    const backgroundVariants = {
        animate: {
            scale: [1, 1.02, 1],
            translateY: [0, -20, 0],
            transition: {
                duration: 30,  // Animation très lente
                repeat: Infinity,
                repeatType: "mirror" as const,
            },
        },
    };

    return (
        <div className="relative h-screen overflow-hidden" onClick={handleClick}>

            {/* Overlay semi-transparent visible au survol */}
            <motion.div
                className="absolute inset-0 bg-black bg-opacity-50 z-30"  // Z-index de l'overlay au-dessus du titre et des infos
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />

            {/* Animation de l'image de fond */}
            <motion.div
                className={`absolute inset-0 bg-cover ${isMobile ? 'bg-center' : 'bg-top'} z-0`}  // Centré sur mobile, en haut sur desktop
                style={{
                    backgroundImage: 'url("/original-poster-cover.png")',
                    backgroundPosition: isMobile ? 'top center' : 'top',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: isMobile ? 'contain' : 'cover',
                }}
                variants={backgroundVariants}
                animate="animate"
            />

            {/* Texte de l'organisateur */}
            <div className="relative z-40 text-center text-white">  {/* Z-index ajusté pour être au-dessus des liens */}
                <div className="flex gap-8 justify-center items-center uppercase text-md font-bold">
                    <span className="text-white bg-ocean py-2 px">
                        <span className="px-5">—</span>
                        {festival_info.organizer} présentent
                        <span className="px-5">—</span>
                    </span>
                </div>
            </div>

            {/* Section titre et informations avec effet parallax sur le titre */}
            <div
                className={`relative z-40 max-w-7xl mx-auto text-white flex ${isMobile ? 'flex-col items-center' : 'lg:flex-row items-start lg:items-center'}`}>
                {/* Section gauche avec le titre */}
                <motion.div
                    className={`w-full lg:w-1/2 lg:pl-20 lg:pr-10 mb-10 lg:mb-0 ${isMobile ? 'text-center text-4xl mt-20' : 'lg:mt-40'}`}
                    style={isMobile ? {letterSpacing: "normal"} : {
                        y: yTitle,
                        letterSpacing: "1em"
                    }}  // Sur mobile, pas d'espacement entre les lettres
                >
                    <div
                        className={`${leagueGothic.className} ${isMobile ? 'text-7xl' : 'text-giant'} uppercase font-extrabold outline-title`}>
                        {eventNameWithLineBreaks}
                    </div>
                </motion.div>

                {/* Section droite avec les informations en quinconce */}
                <div className={`w-full lg:w-1/2 space-y-8 ${isMobile ? 'text-center' : 'text-left'}`}>
                    <div className="space-y-4">
                        {festival_info.day.map((day, index) => {
                            const lineUp = day.artist.sort((a: Artist, b: Artist) => {
                                if (a.lineup_order === null) return 1; // Place `null` à la fin
                                if (b.lineup_order === null) return -1; // Place `null` à la fin
                                return a.lineup_order - b.lineup_order; // Tri normal pour les autres
                            });
                            return (
                                <div key={index} id={day.startAt}>
                                    <a href="#" onClick={() => scrollToContent('day-' + day.id)}>
                                        <div
                                            className="bg-white rounded-full px-8 py-4 text-2xl font-semibold text-highlight mt-8 mb-6 lg:mt-24 max-w-md mx-auto text-center flex justify-center items-center">
                                            {day.short_name}<br/><Time value={day.startAt}/> - <Time value={day.endAt}/>
                                        </div>
                                    </a>
                                    <ul className={`text-3xl uppercase space-y-2 text-center items-center ${isMobile && 'text-xl'}`}>
                                        {lineUp.length > 3 ? (
                                            // S'il y a plus de 3 artistes, ajouter des virgules
                                            lineUp.map((artist, index) => (
                                                <li key={index}
                                                    className="inline">
                                                    <a href="#"
                                                       onMouseEnter={() => setCursorSize(60)}
                                                       onMouseLeave={() => setCursorSize(24)}
                                                       onClick={() => scrollToContent(`artist-${artist.id}`)}
                                                       className="hover:underline">
                                                        {artist.name}&nbsp;
                                                        <span className="text-lg">
                        {artist.genre && (<>({artist.genre})</>)}
                    </span>
                                                    </a>
                                                    {/* Ajouter une virgule sauf pour le dernier artiste */}
                                                    {index < lineUp.length - 1 && ', '}
                                                </li>
                                            ))
                                        ) : (
                                            // Moins ou 3 artistes, pas de virgule, comportement normal
                                            lineUp.map((artist, index) => (
                                                <li key={index}>
                                                    <a href="#"
                                                       onMouseEnter={() => setCursorSize(60)}
                                                       onMouseLeave={() => setCursorSize(24)}
                                                       onClick={() => scrollToContent(`artist-${artist.id}`)}
                                                       className="hover:underline">
                                                        {artist.name}&nbsp;
                                                        <span className="text-lg">
                        {artist.genre && (<>({artist.genre})</>)}
                    </span>
                                                    </a>
                                                </li>
                                            ))
                                        )}
                                    </ul>


                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>

            {/* Bouton avec une icône pour scroll smooth et effet hover */}
            <motion.div
                className="absolute bottom-8 w-full text-center z-50"  // Bouton au-dessus de tout sauf le curseur
                whileHover={{scale: 1.2}}
                transition={{type: "spring", stiffness: 300}}
                onMouseEnter={() => {
                    setIsHovered(true);
                    setCursorSize(60);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setCursorSize(24);
                }}
            >
                <button
                    onClick={() => scrollToContent("content-section")}
                    className="text-white text-4xl bg-highlight rounded-full p-4"
                >
                    <FaChevronDown/>
                </button>

                {/* Texte "Plus d'infos" qui apparaît au survol */}
                <motion.span
                    className="block mt-4 text-xl text-white"
                    initial={{opacity: 0}}
                    animate={{opacity: isHovered ? 1 : 0}}  // Changement d'opacité lors du survol
                    transition={{duration: 0.3}}
                >
                    Plus d'infos
                </motion.span>
            </motion.div>

            {/* Curseur personnalisé avec effet de clic */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-60"
                style={{
                    width: cursorSize,
                    height: cursorSize,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    x: mousePosition.x - cursorSize / 2,
                    y: mousePosition.y - cursorSize / 2,
                }}
                animate={{
                    scale: isClicked ? 0.5 : cursorSize === 60 ? 1.1 : 1,
                    transition: {duration: 0.1},
                }}
            />
        </div>
    );
}
