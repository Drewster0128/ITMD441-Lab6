//list of locations with there latitude and longitude coordinates
class Location
{
    #sunRiseToday;
    #sunSetToday;
    #name;
    #latitude;
    #longitude;
    
    constructor(name, latitude, longitude)
    {
        this.#name = name;
        this.#latitude = latitude;
        this.#longitude = longitude;
        this.#sunRiseToday = null;
        this.#sunSetToday = null;
    }

    async #fetchSunData()
    {
        let response = await fetch(`https://api.sunrisesunset.io/json?lat=${this.#latitude}&lng=${this.#longitude}`);
        response = await response.json();
        this.#sunRiseToday = response["results"]["sunrise"];
        this.#sunSetToday = response["results"]["sunset"];
    }

    get sunRiseToday()
    {
        return (async() => {
            if(this.#sunRiseToday == null)
            {
                await this.#fetchSunData();
            }
            return this.#sunRiseToday;
        })();
    }

    get sunSetToday()
    {
        return (async() => {
            if(this.#sunSetToday == null)
            {
                await this.#fetchSunData();
            }
            return this.#sunSetToday;
        })();
    }
}

let chicago = new Location("chicago", 41.85003, -87.65005);
chicago.sunRiseToday.then((sunRise) => console.log(sunRise));

