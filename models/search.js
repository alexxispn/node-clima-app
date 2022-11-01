import mapboxApi from "../api/mapboxApi.js";
import openweatherApi from "../api/openweatherApi.js";
import dotenv from "dotenv";

dotenv.config();

export default class Search {
    history = [];

    constructor() {
    }

    async city(place = '') {
        try {
            return await mapboxApi(place);
        } catch (error) {
            console.log(error);
        }
    }

    async weather(lat = '', lon = '') {
        try {
            return await openweatherApi(lat, lon);
        } catch (error) {
            console.log(error);
        }
    }
}
