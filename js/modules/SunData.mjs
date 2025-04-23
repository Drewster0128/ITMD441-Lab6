export default class SunData
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
        this.sunRise = response.results["sunrise"];
        this.sunSet = response.results["sunset"];

        this.#timezone = response.results["timezone"];
    }

    #removeSeconds(time)
    {
        let [prefix, suffix] = time.split(" ");
        let [hour, minute, _] = prefix.split(":");
        time = [hour, minute].join(":");
        return [time, suffix].join(" ");
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

    set sunRise(sunRise)
    {
        //remove seconds as it is unncessary for most people
        this.#sunrise = this.#removeSeconds(sunRise);
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

    set sunSet(sunSet)
    {
        this.#sunset = this.#removeSeconds(sunSet);
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