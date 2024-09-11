export type FestivalInfo = {
    "id": number,
    "event_name": string,
    "baseline": string,
    "organizer": string,
    "description": string,
    "start_date": string,
    "end_date": string,
    "location": string,
    "price": string,
    "additional_info": string
    "date": string
    "address": string
    "city": string
    "edition": string
    "day": Day[]
}

export type Artist = {
    "id": number,
    "name": string,
    "instrument": string,
    "city": string,
    "genre": string,
    "country": string,
    "description": string,
    "photo_url": string,
    "info_link": string,
    "slug": string,
    "lineup_order": number
    "artist_instrument": ArtistInstrument[]
    "day": Day
    "timePassage": string
}

export type ArtistInstrument = {
    instrument: {
        "name": string,
        "photo_url": string
    }
}

export type Day = {
    "name": string,
    "short_name": string,
    "startAt": string,
    "endAt": string,
    "artist": Artist[]
}
