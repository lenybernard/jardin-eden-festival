import Image from "next/image";
import Hero from "@/components/hero";
import {createClient} from "@/utils/supabase/server";
import {Artist, Day, FestivalInfo} from "@/app/types";
import {ArtistCard} from "@/components/ui/ArtistCard";
import {Time} from "@/components/utils/time";
import {StickyMenu} from "@/components/ui/StickyMenu";
import {Anchor} from "@/components/ui/Anchor";
import React from "react";

export default async function Index() {
    const supabase = createClient()
    const { data } = await supabase.from('festival_info').select(
        '*, food_info(*), day(*, artist(*, artist_instrument(instrument(*)), day(*)))'
    ).filter('edition', 'eq', '2024')
    if (!data || !data.length) {
        return <p>No data</p>
    }
    const festival_info = data.map(festival => {
        const sortedDays = festival.day.map((d: Day) => {  // Ici, spécifiez que d est un objet de type Day
            const sortedArtists = d.artist.sort((a: Artist, b: Artist) => {  // Spécifiez que a et b sont des objets Artist
                if (a.lineup_order === null) return 1; // Place `null` à la fin
                if (b.lineup_order === null) return -1; // Place `null` à la fin
                return a.lineup_order - b.lineup_order; // Tri normal pour les autres
            });

            return { ...d, artist: sortedArtists };
        });
        sortedDays.sort((a: Day, b: Day) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

        return { ...festival, day: sortedDays } as FestivalInfo;
    })[0];

    return <div>
        <Hero festival_info={festival_info}/>
        <StickyMenu festivalInfo={festival_info}/>
        {/* Programme Section -->*/}
        <section className="pt-12 bg-white">
                <div id={"content-section"} className="max-w-7xl mx-auto text-center px-4">
                    <Anchor id={"programme"}/>
                    <h2 className="text-4xl font-semibold text-highlight mb-8">Programme</h2>
                        <div>
                            {festival_info.day.map((day, index) => {
                                // sort by timePassage
                                const sortedArtists = day.artist.sort((a: Artist, b: Artist) => {
                                    if (a.timePassage === null) return 1; // Place `null` à la fin
                                    if (b.timePassage === null) return -1; // Place `null` à la fin
                                    return a.timePassage.localeCompare(b.timePassage); // Tri normal pour les autres
                                });
                                return (
                                    <div key={index}>
                                        <Anchor id={'day-' + day.id}/>
                                        <h3 className="text-3xl font-bold text-gray-800 mb-4">{day.name}</h3>
                                        <p className="text-lg text-gray-700 space-y-2">
                                            🕒 <Time value={day.startAt}/> - <Time value={day.endAt}/>
                                        </p>

                                        <p className="text-gray-700 my-6 text-center"
                                           dangerouslySetInnerHTML={{__html: day.description}}/>

                                        <section id={day.short_name} className="py-16 text-gray-800">
                                            <div className="container mx-auto px-4">
                                                {sortedArtists.map((artist, index) => (
                                                    <div key={index}>
                                                        <Anchor id={`artist-${artist.id}`} className={"-mt-48"}/>
                                                        <div className={'my-16'}>
                                                            <ArtistCard artist={artist} isEven={index % 2 === 0}/>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                )
                                }
                            )}
                        </div>
                </div>
        </section>
        {/* Food & Drink Section */}
        {/*<section className="pt-12 min-h-[800px]" >*/}
        {/*    <Anchor id={"food-and-drink"}/>*/}
        {/*    <div id={"content-section"} className="max-w-8xl mx-auto text-center px-4 pb-16">*/}
        {/*        <h2 className="text-4xl font-semibold text-highlight mb-8">Vos papilles aussi vont s'en souvenir</h2>*/}
        {/*        <div className="text-2xl font-semibold text-white mb-8">On a mis les petits plats dans les grands</div>*/}
        {/*        <FoodShowcaseCarousel foods={festival_info.food_info}/>*/}
        {/*    </div>*/}
        {/*</section>*/}

        {/* Info Section */}
            <section className="py-12 bg-highlight text-white">
                 <Anchor id={"informations"}/>
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-semibold mb-8">Infos pratiques</h2>
                    <p className="text-lg mb-4">📍 Adresse : {festival_info.address_info_link &&
                        <a href={festival_info.address_info_link} className={'underline'}>{festival_info.address}, {festival_info.city}</a> || <>{festival_info.address} {festival_info.city}</>}</p>
                    <div className={"flex justify-center items-center gap-8"}>
                        <Image src={"/billet.webp"} alt="logo" width={120} height={200}/>
                        <div className={"flex flex-col items-center gap-4"}>
                            <p className="text-lg">
                                {festival_info.store_url &&
                                    <a className="bg-paradise text-ocean py-2 px-4 rounded hover:bg-paradise-dark transition"
                                       target={"_blank"} href={festival_info.store_url}>
                                        {festival_info.store_button_label ?? 'Pré-vente'}
                                    </a>
                                }
                            </p>
                            <div className={"mb-4 italic"} dangerouslySetInnerHTML={{__html: festival_info.price}} />
                        </div>
                    </div>
                    <p>{festival_info.practical_informations_extra}</p>
                </div>
            </section>

    </div>
}
