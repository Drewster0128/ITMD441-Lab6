//list of locations with there latitude and longitude coordinates
class Location
{
    #sunRiseToday;
    #sunSetToday;
    #sunRiseTomorrow;
    #sunSetTomorrow;
    #name;
    #latitude;
    #longitude;
    
    constructor(name, latitude, longitude)
    {
        this.#name = name;
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    async #fetchSunData()
    {
        let response = await fetch(`https://api.sunrisesunset.io/json?lat=${this.#latitude}&lng=${this.#longitude}&date_start=today&date_end=tomorrow`);
        response = await response.json();

        this.#sunRiseToday = response.results[0].sunrise;
        this.#sunSetToday = response.results[0].sunset;
        this.#sunRiseTomorrow = response.results[1].sunrise;
        this.#sunSetTomorrow = response.results[1].sunset;
    }

    get sunRiseToday()
    {
        return (async() => {
            if(!this.#sunRiseToday)
            {
                await this.#fetchSunData();
            }
            return this.#sunRiseToday;
        })();
    }

    get sunSetToday()
    {
        return (async() => {
            if(!this.#sunSetToday)
            {
                await this.#fetchSunData();
            }
            return this.#sunSetToday;
        })();
    }

    get sunRiseTomorrow()
    {
        return (async() => {
            if(!this.#sunRiseTomorrow)
            {
                await this.#fetchSunData();
            }
            return this.#sunRiseTomorrow;
        })();
    }

    get sunSetTomorrow()
    {
        return (async() => {
            if(!this.#sunSetTomorrow)
            {
                await this.#fetchSunData();
            }
            return this.#sunSetTomorrow;
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