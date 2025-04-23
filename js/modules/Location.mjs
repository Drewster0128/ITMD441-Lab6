import SunData from "./SunData.mjs";

export default class Location
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