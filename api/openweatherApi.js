import HttpsClient from "../infra/HttpsClient.js";
import dotenv from "dotenv";

dotenv.config();

const client = new HttpsClient();
const baseUrl = process.env.OPENWEATHER_API_URL;
const params = {
    appid: process.env.OPENWEATHER_KEY,
    units: 'metric',
    lang: 'en'
}

export default async (lat = '', lon = '') => {
    try {
        const {weather, main} = await client.instance(baseUrl, {...params, lat, lon});
        return {
            temp: main.temp,
            min: main.temp_min,
            max: main.temp_max,
            desc: weather[0].description
        };
    } catch (error) {
        console.log(error);
    }
}

