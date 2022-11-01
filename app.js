import {inquirerMenu, listPlaces, pause, readInput} from "./helpers/inquirer.js";
import Search from "./models/search.js";


const main = async () => {
    const search = new Search();
    let opt = '';
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const city = await readInput('City: ');
                const result = await search.city(city);
                const id = await listPlaces(result);
                const place = result.find(place => place.id === id);
                const {lat, lng} = place;
                const weather = await search.weather(lat, lng);
                console.log(weather);
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
                console.log("History");
                break;
        }
        if (opt !== 0) await pause();
    } while (opt !== 0);
};

main().then(r => console.log("Done!"));
