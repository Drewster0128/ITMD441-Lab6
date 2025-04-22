//list of locations with there latitude and longitude coordinates
class Location
{
    #sunData;
    #name;
    #latitude;
    #longitude;
    
    constructor(name, latitude, longitude)
    {
        this.#name = name;
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#sunData = [new SunData("today", latitude, longitude), new SunData("tomorrow", latitude, longitude)];
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

let chicago = new Location("Chicago", 41.85003, -87.65005);
let cypress = new Location("Cypress", 33.81696, -118.03729);
let burlington = new Location("Burlington", 36.09569, -79.4378);
let longview = new Location("Longview", 32.5007, -94.74049);
let phenixCity = new Location("Phenix City", 32.47098, -85.00077);
let minnetonka = new Location("Minnetonka", 44.9133, -93.50329);
let bartlett = new Location("Bartlett", 35.20453, -89.87398);
let shawnee = new Location("Shawnee", 39.04167, -94.72024);
let buenaPark = new Location("Buena Park", 33.86751, -117.99812);
let youngstown = new Location("Youngstown", 41.09978, -80.64952);