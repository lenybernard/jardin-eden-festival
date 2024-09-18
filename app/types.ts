export type FestivalInfo = {
    id: number,
    event_name: string,
    baseline: string,
    organizer: string,
    description: string,
    start_date: string,
    end_date: string,
    location: string,
    price: string,
    additional_info: string
    store_url: string
    store_button_label: string
    practical_informations_extra: string
    date: string
    address: string
    city: string
    address_info_link: string
    edition: string
    day: Day[]
    food_info: FoodInfo[]
}

export type Artist = {
    id: number,
    name: string,
    instrument: string,
    city: string,
    genre: string,
    country: string,
    description: string,
    embed: string,
    photo_url: string,
    photoCredit: string,
    info_link: string,
    slug: string,
    lineup_order: number
    artist_instrument: ArtistInstrument[]
    day: Day
    timePassage: string
}

export type ArtistInstrument = {
    instrument: {
        name: string,
        photo_url?: string
    }
}

export type Day = {
    id: string,
    name: string,
    short_name: string,
    description: string,
    startAt: string,
    endAt: string,
    artist: Artist[]
}

export type FoodInfo = {
    id: number,
    name: string
    description: string
    manager: string
    photo_url?: string
    info_link?: string
}
