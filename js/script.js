import Location from "./modules/Location.mjs";

let chicago = new Location("Chicago", 41.85003, -87.65005, "chicago");
let cypress = new Location("Cypress", 33.81696, -118.03729, "cypress");
let burlington = new Location("Burlington", 36.09569, -79.4378, "burlington");
let longview = new Location("Longview", 32.5007, -94.74049, "longview");
let phenixCity = new Location("Phenix City", 32.47098, -85.00077, "phenix_city");
let minnetonka = new Location("Minnetonka", 44.9133, -93.50329, "minnetonka");
let bartlett = new Location("Bartlett", 35.20453, -89.87398, "bartlett");
let shawnee = new Location("Shawnee", 39.04167, -94.72024, "shawnee");
let buenaPark = new Location("Buena Park", 33.86751, -117.99812, "buena_park");
let youngstown = new Location("Youngstown", 41.09978, -80.64952, "youngstown");



let cities = new Array(chicago, cypress, burlington, longview, phenixCity, minnetonka, bartlett, shawnee, buenaPark, youngstown);
for(let i = 0; i < cities.length; i++)
{
    Promise.all([cities[i].todaysSunData.sunRise, cities[i].todaysSunData.dawn, cities[i].todaysSunData.solorNoon, cities[i].todaysSunData.dusk, cities[i].todaysSunData.sunSet, cities[i].todaysSunData.timezone])
        .then(values => {
            document.querySelector(`#${cities[i].id} .city__data`).innerHTML = `
            <li class="sun__dawn">
                <h3>Dawn</h3>
                <p class="sun__text">${values[1]}</p>
            </li>
            <li class="sun__sunrise">
                <img class="sum__img" src="img/sunrise.png"/>
                <p class="sun__text">${values[0]}</p>
            </li>
            <li class="sun__solarnoon">
                <h3>Solar Noon</h3>
                <p class="sun__text">${values[2]}</p>
            </li>
            <li class="sun__sunset">
                <img class="sun__img" src="img/sunset.png"/>
                <p class="sun__text">${values[4]}</p>
            </li>
            <li class="sun__dusk">
                <h3>Dusk</h3>
                <p class="sun__text">${values[3]}</p>
            </li>`

            document.querySelector(`#${cities[i].id} .city__timezone`).textContent = values[5];
            document.querySelector(`#${cities[i].id} .city__coords`).textContent = `(${cities[i].latitude}, ${cities[i].longitude})`
        });
}

document.querySelectorAll(".city").forEach((cityHTMLElement) => {
    cityHTMLElement.addEventListener("click", (e) => selectCity(cityHTMLElement.id));
})

document.querySelector("#switch").addEventListener("click", (e) => toggleData(document.querySelector("#switch")));

function selectCity(id)
{
    //remove currently selected city
    document.querySelector(".city--selected").classList.remove("city--selected");
    //add city selected class to newly selected city
    document.querySelector(`#${id}`).classList.add("city--selected");
}

function toggleData(checkbox)
{
    if(!checkbox.checked)
    {
        //output todays data
        for(let i = 0; i < cities.length; i++)
        {
            Promise.all([cities[i].todaysSunData.sunRise, cities[i].todaysSunData.dawn, cities[i].todaysSunData.solorNoon, cities[i].todaysSunData.dusk, cities[i].todaysSunData.sunSet, cities[i].todaysSunData.timezone])
                .then(values => {
                    document.querySelector(`#${cities[i].id} .city__data`).innerHTML = `
                    <li class="sun__dawn">
                        <h3>Dawn</h3>
                        <p class="sun__text">${values[1]}</p>
                    </li>
                    <li class="sun__sunrise">
                        <img class="sum__img" src="img/sunrise.png"/>
                        <p class="sun__text">${values[0]}</p>
                    </li>
                    <li class="sun__solarnoon">
                        <h3>Solar Noon</h3>
                        <p class="sun__text">${values[2]}</p>
                    </li>
                    <li class="sun__sunset">
                        <img class="sun__img" src="img/sunset.png"/>
                        <p class="sun__text">${values[4]}</p>
                    </li>
                    <li class="sun__dusk">
                        <h3>Dusk</h3>
                        <p class="sun__text">${values[3]}</p>
                    </li>`
        
                    document.querySelector(`#${cities[i].id} .city__timezone`).textContent = values[5];
                    document.querySelector(`#${cities[i].id} .city__coords`).textContent = `(${cities[i].latitude}, ${cities[i].longitude})`
                });
        }
    }
    else
    {
        //output tomorrows data
        for(let i = 0; i < cities.length; i++)
            {
                Promise.all([cities[i].tomorrowsSunData.sunRise, cities[i].tomorrowsSunData.dawn, cities[i].tomorrowsSunData.solorNoon, cities[i].tomorrowsSunData.dusk, cities[i].tomorrowsSunData.sunSet, cities[i].tomorrowsSunData.timezone])
                    .then(values => {
                        document.querySelector(`#${cities[i].id} .city__data`).innerHTML = `
                        <li class="sun__dawn">
                            <h3>Dawn</h3>
                            <p class="sun__text">${values[1]}</p>
                        </li>
                        <li class="sun__sunrise">
                            <img class="sum__img" src="img/sunrise.png"/>
                            <p class="sun__text">${values[0]}</p>
                        </li>
                        <li class="sun__solarnoon">
                            <h3>Solar Noon</h3>
                            <p class="sun__text">${values[2]}</p>
                        </li>
                        <li class="sun__sunset">
                            <img class="sun__img" src="img/sunset.png"/>
                            <p class="sun__text">${values[4]}</p>
                        </li>
                        <li class="sun__dusk">
                            <h3>Dusk</h3>
                            <p class="sun__text">${values[3]}</p>
                        </li>`
            
                        document.querySelector(`#${cities[i].id} .city__timezone`).textContent = values[5];
                        document.querySelector(`#${cities[i].id} .city__coords`).textContent = `(${cities[i].latitude}, ${cities[i].longitude})`
                    });
            }
    }
}