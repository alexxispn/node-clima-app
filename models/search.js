import fs from 'fs';
import mapboxApi from "../api/mapboxApi.js";
import openweatherApi from "../api/openweatherApi.js";
import dotenv from "dotenv";

dotenv.config();

export default class Search {
    history = [];
    dbPath = './db/database.json';

    constructor() {
        this.readHistory();
    }

    get historyCapitalized() {
        return this.history.map(place => {
            let words = place.split(' ');
            words = words.map(word => word[0].toUpperCase() + word.substring(1));
            return words.join(' ');
        });
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

    addHistory(place = '') {
        if (this.history.includes(place.toLowerCase())) return;
        this.history.unshift(place.toLowerCase());
        this.history = this.history.splice(0, 5);
        this.saveHistory();
    }

    saveHistory() {
        const payload = {
            history: this.history
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    readHistory() {
        if (!fs.existsSync(this.dbPath)) return;
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.history = data.history;
    }
}
