//list of locations with there latitude and longitude coordinates
class Location
{
    #sunData;
    #name;
    #latitude;
    #longitude;
    #id;
    
    constructor(name, latitude, longitude, id)
    {
        this.#name = name;
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#sunData = [new SunData("today", latitude, longitude), new SunData("tomorrow", latitude, longitude)];
        this.#id = id;
    }

    get todaysSunData()
    {
        return this.#sunData[0];
    }

    get tomorrowsSunData()
    {
        return this.#sunData[1];
    }

    get latitude()
    {
        return this.#latitude;
    }

    get longitude()
    {
        return this.#longitude;
    }

    get name()
    {
        return this.#name;
    }

    get id()
    {
        return this.#id;
    }
}

class SunData
{
    #date;
    #dawn;
    #dayLength;
    #dusk;

    #latitude;
    #longitude;

    #solorNoon;
    #sunrise;
    #sunset;
   
    #timezone;

    constructor(date, latitude, longitude)
    {
        this.#date = date;
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    async #fetchSunData()
    {
        let response = await fetch(`https://api.sunrisesunset.io/json?lat=${this.#latitude}&lng=${this.#longitude}&date=${this.#date}`);
        response = await response.json();
            
        this.#date = response.results["date"];
        this.#dawn = response.results["dawn"];
        this.#dayLength = response.results["day_length"];
        this.#dusk = response.results["dusk"];
        
        this.#solorNoon = response.results["solar_noon"];
        this.#sunrise = response.results["sunrise"];
        this.#sunset = response.results["sunset"];

        this.#timezone = response.results["timezone"];
    }

    get date()
    {
        return (async() => {
            if(!this.#date)
            {
                await this.#fetchSunData();
            }
            return this.#date;
        })();
    }

    get dawn()
    {
        return (async() => {
            if(!this.#dawn)
            {
                await this.#fetchSunData();
            }
            return this.#dawn;
        })();
    }

    get dayLength()
    {
        return (async() => {
            if(!this.#dayLength)
            {
                await this.#fetchSunData();
            }
            return this.#dayLength;
        })();
    }

    get dusk()
    {
        return (async() => {
            if(!this.#dusk)
            {
                await this.#fetchSunData();
            }
            return this.#dusk;
        })();
    }

    get solorNoon()
    {
        return (async() => {
            if(!this.#solorNoon)
            {
                await this.#fetchSunData();
            }
            return this.#solorNoon;
        })();
    }

    get sunRise()
    {
        return (async() => {
            if(!this.#sunrise)
            {
                await this.#fetchSunData();
            }
            return this.#sunrise;
        })();
    }

    get sunSet()
    {
        return (async() => {
            if(!this.#sunset)
            {
                await this.#fetchSunData();
            }
            return this.#sunset;
        })();
    }

    get timezone()
    {
        return (async() => {
            if(!this.#timezone)
            {
                await this.#fetchSunData();
            }
            return this.#timezone;
        })();
    }
}

let chicago = new Location("Chicago", 41.85003, -87.65005, "chicago");
let cypress = new Location("Cypress", 33.81696, -118.03729, "cypress");
let burlington = new Location("Burlington", 36.09569, -79.4378, "burlington");
let longview = new Location("Longview", 32.5007, -94.74049, "longview");
let phenixCity = new Location("Phenix City", 32.47098, -85.00077, "phenx_city");
let minnetonka = new Location("Minnetonka", 44.9133, -93.50329, "minnetonka");
let bartlett = new Location("Bartlett", 35.20453, -89.87398, "bartlett");
let shawnee = new Location("Shawnee", 39.04167, -94.72024, "shawnee");
let buenaPark = new Location("Buena Park", 33.86751, -117.99812, "buena_park");
let youngstown = new Location("Youngstown", 41.09978, -80.64952, "youngstown");

cities = new Array(chicago, cypress, burlington, longview, phenixCity, minnetonka, bartlett, shawnee, buenaPark, youngstown);
for(let i = 0; i < cities.length; i++)
{
    Promise.all([cities[i].todaysSunData.sunRise, cities[i].todaysSunData.sunSet])
        .then(values => {
            document.getElementById(cities[i].id).children[1].innerHTML = `
            <li class="city__sunrise">${values[0]}</li>
            <li class="city__sunset">${values[1]}</li>`
        });
}