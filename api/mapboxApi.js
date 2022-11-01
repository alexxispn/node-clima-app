import HttpsClient from "../infra/HttpsClient.js";
import dotenv from "dotenv";

dotenv.config();

const client = new HttpsClient();
const baseUrl = process.env.MAPBOX_API_URL;
const params = {
    access_token: process.env.MAPBOX_KEY,
    limit: 5,
    language: 'en'
}

export default async (place = '') => {
    try {
        const url = baseUrl + place + '.json';
        const {features} = await client.instance(url, params);
        return features.map(place => ({
            id: place.id,
            name: place.place_name,
            lng: place.center[0],
            lat: place.center[1]
        }));
    } catch (error) {
        console.log(error);
    }
}

