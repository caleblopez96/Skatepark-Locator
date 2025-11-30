// src/parkData.ts
import EspeePark from "./assets/EspeePark.avif";
import ManselPark from "./assets/ManselPark.jpg";
import Freestone from "./assets/FreeStonePark.webp";
import AJS from "./assets/AJS.webp";
import TempeSkatepark from "./assets/TempeSkatepark.webp";
import ChandlerSkatepark from "./assets/ChandlerSkatepark.webp";
import ParadiseValley from "./assets/phoenix-paradise-valley-park.jpg";
import XCourt from "./assets/X-court.avif";
import Pecos from "./assets/Pecos.avif";
import ElMirage from "./assets/ElMirage.jpg";
import DesertWest from "./assets/DesertWest.webp";

export interface Skatepark {
    id: number;
    name: string;
    lat: number;
    lng: number;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    bikeFriendly: boolean;
    image?: string;
    hours?: string;
}

export const skateparks: Skatepark[] = [
    {
        id: 1,
        name: "Espee Bike Park",
        lat: 33.32872471816101,
        lng: -111.83449676096131,
        street: "450 E Knox Rd",
        city: "Chandler",
        state: "AZ",
        zip: "85225",
        bikeFriendly: true,
        image: EspeePark,
        hours: "6:30 AM - 10:30 PM",
    },
    {
        id: 2,
        name: "Mansel Skatepark",
        lat: 33.253411126792194,
        lng: -111.66081760640316,
        street: "20900-23000 196th St",
        city: "Queen Creek",
        state: "AZ",
        zip: "85142",
        bikeFriendly: true,
        image: ManselPark,
        hours: "7:00 AM - 9:30 PM",
    },
    {
        id: 3,
        name: "Freestone Skatepark",
        lat: 33.35881302300737,
        lng: -111.76945410876573,
        street: "1045 E Juniper Ave.",
        city: "Gilbert",
        state: "AZ",
        zip: "85234",
        bikeFriendly: false,
        image: Freestone,
        hours: "5:30 AM - 9:00 PM",
    },
    {
        id: 4,
        name: "Apache Junction Skatepark",
        lat: 33.39206866853851,
        lng: -111.55810933217953,
        street: "1091 W Southern Ave.",
        city: "Apache Junction",
        state: "AZ",
        zip: "85120",
        bikeFriendly: false,
        image: AJS,
        hours: "8:00 AM - 9:00 PM",
    },
    {
        id: 5,
        name: "Tempe Skatepark",
        lat: 33.339505109505595,
        lng: -111.95308158568407,
        street: "8401 S Hardy Dr.",
        city: "Tempe",
        state: "AZ",
        zip: "85284",
        bikeFriendly: false,
        image: TempeSkatepark,
        hours: "6:00 AM - 10:00 PM",
    },
    {
        id: 6,
        name: "Chandler Skatepark",
        lat: 33.24041849001316,
        lng: -111.85943387535866,
        street: "4500 S Basha Rd.",
        city: "Chandler",
        state: "AZ",
        zip: "85248",
        bikeFriendly: false,
        image: ChandlerSkatepark,
        hours: "7:00 AM - 10:30 PM",
    },
    {
        id: 7,
        name: "Paradise Valley Skatepark",
        lat: 33.65040033092158,
        lng: -111.99850335581807,
        street: "17642 N 40th St.",
        city: "Phoenix",
        state: "AZ",
        zip: "85032",
        bikeFriendly: false,
        image: ParadiseValley,
        hours: "5:30 AM - 11:00 PM",
    },
    {
        id: 8,
        name: "X-Court BMX Park",
        lat: 33.526135120335354,
        lng: -112.23613136441121,
        street: "6101 N 83rd Ave",
        city: "Glendale",
        state: "AZ",
        zip: "85303",
        bikeFriendly: true,
        image: XCourt,
        hours: "9:00 AM - 10:00 PM",
    },
    {
        id: 9,
        name: "Pecos Skatepark",
        lat: 33.29164837342485,
        lng: -111.9810465711636,
        street: "17010 S 48th St",
        city: "Glendale",
        state: "AZ",
        zip: "85048",
        bikeFriendly: false,
        image: Pecos,
        hours: "7:00 AM - 10:00 PM",
    },
    {
        id: 10,
        name: "El Mirage Skatepark",
        lat: 33.574783597251205,
        lng: -112.3255655,
        street: "W Cinnabar Ave",
        city: "El Mirage",
        state: "AZ",
        zip: "85335",
        bikeFriendly: false,
        image: ElMirage,
        hours: "24hrs",
    },
    {
        id: 11,
        name: "Desert West Skateboard Plaza",
        lat: 33.47454040174397,
        lng: -112.20233549008427,
        street: "6602 W Encanto Blvd,",
        city: "Phoenix",
        state: "AZ",
        zip: "85035",
        bikeFriendly: false,
        image: DesertWest,
        hours: "8:00 AM - 10:00 PM",
    },
    {
        id: 12,
        name: "Surprise Farms Skatepark",
        lat: 33.627847339550605,
        lng: -112.43453637287749,
        street: "15798-15826 N 175th Ave",
        city: "Surprise",
        state: "AZ",
        zip: "85388",
        bikeFriendly: false,
        image: ElMirage,
        hours: "24hrs",
    },
];
