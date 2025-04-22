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

let chicago = new Location("chicago", 41.85003, -87.65005);
Promise.all([chicago.sunRiseToday, chicago.sunSetToday, chicago.sunRiseTomorrow, chicago.sunSetTomorrow])
    .then((values) => {
        for(let i = 0; i < values.length; i++)
        {
            console.log(values[i]);
        }
    });

