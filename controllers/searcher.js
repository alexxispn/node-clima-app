import {inquirerMenu, listPlaces, pause, readInput} from "../helpers/inquirer.js";
import Search from "../models/search.js";

export default async () => {
    const search = new Search();
    let opt = '';
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const city = await readInput('City: ');
                const result = await search.city(city);
                const id = await listPlaces(result);
                if (id === '0') continue;
                const place = result.find(place => place.id === id);
                search.addHistory(place.name);
                const {lat, lng} = place;
                const weather = await search.weather(lat, lng);
                console.clear();
                console.log('\nInformation of the city\n'.green);
                console.log('City: ', place.name.yellow);
                console.log('Lat: ', place.lat);
                console.log('Lng: ', place.lng);
                console.log('Temperature: ', weather.temp);
                console.log('Min: ', weather.min);
                console.log('Max: ', weather.max);
                console.log('Weather description: ', weather.desc.yellow);
                break;
            case 2:
                search.historyCapitalized.forEach((place, i) => {
                    const idx = `${i + 1}`;
                    console.log(`${idx.green}. ${place}`);
                });
        }
        if (opt !== 0) await pause();
    } while (opt !== 0);
};
