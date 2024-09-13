import Hero from "@/components/hero";
import {createClient} from "@/utils/supabase/server";
import {Artist, Day, FestivalInfo} from "@/app/types";
import {ArtistCard} from "@/components/ui/ArtistCard";
import {Time} from "@/components/utils/time";
import {FoodShowcaseCarousel} from "@/components/ui/FoodShowcaseCarousel";

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
        {/* Programme Section -->*/}
        <section className="pt-12 bg-white">
                <div id={"content-section"} className="max-w-7xl mx-auto text-center px-4">
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
                                    <div key={index} id={'day-' + day.id}>
                                    <h3 className="text-3xl font-bold text-gray-800 mb-4">{day.name}</h3>
                                    <p className="text-lg text-gray-700 space-y-2">
                                        🕒 <Time value={day.startAt}/> - <Time value={day.endAt}/>
                                    </p>

                                    <section id={day.short_name} className="py-16 text-gray-800">
                                        <div className="container mx-auto px-4">
                                                {sortedArtists.map((artist, index) => (
                                                    <div key={index} id={artist.slug} className={'my-16'}>
                                                        <ArtistCard artist={artist} isEven={index % 2 === 0}/>
                                                    </div>
                                                ))}
                                        </div>
                                    </section>
                                </div>
                                )}
                            )}
                        </div>
                </div>
        </section>
        {/* Food & Drink Section */}
        <section className="pt-12 min-h-[800px]" >
            <div id={"content-section"} className="max-w-8xl mx-auto text-center px-4 pb-16">
                <h2 className="text-4xl font-semibold text-highlight mb-8">Vos papilles aussi vont s'en souvenir</h2>
                <div className="text-2xl font-semibold text-white mb-8">On a mis les petits plats dans les grands</div>
                <FoodShowcaseCarousel foods={festival_info.food_info}/>
            </div>
        </section>

        {/* Info Section */}
            <section className="py-12 bg-highlight text-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-4xl font-semibold mb-8">Informations Pratiques</h2>
                    <p className="text-lg mb-4">📍 Adresse : 19 rue des Changes, Gétigné</p>
                    <p className="text-lg mb-4">🏛️ Lieu : Le Paradis</p>
                    <p className="text-lg mb-4">🎟️ Entrée : Prix libre en conscience</p>
                </div>
            </section>

        </div>
}
