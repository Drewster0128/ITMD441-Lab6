import Location from "./modules/Location.mjs";

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



let cities = new Array(chicago, cypress, burlington, longview, phenixCity, minnetonka, bartlett, shawnee, buenaPark, youngstown);
for(let i = 0; i < cities.length; i++)
{
    Promise.all([cities[i].todaysSunData.sunRise, cities[i].todaysSunData.sunSet, cities[i].todaysSunData.timezone])
        .then(values => {
            document.querySelector(`#${cities[i].id} .city__data`).innerHTML = `
            <li>
                <img class="sum__img" src="img/sunrise.png"/>
                <p class="sun__text">${values[0]}</p>
            </li>
            <li>
                <img class="sun__img" src="img/sunset.png"/>
                <p class="sun__text">${values[1]}</p>
            </li>`

            document.querySelector(`#${cities[i].id} .city__timezone`).textContent = values[2];
        });
}

document.querySelectorAll(".city").forEach((cityHTMLElement) => {
    cityHTMLElement.addEventListener("click", (e) => selectCity(cityHTMLElement.id));
})

function selectCity(id)
{
    //remove currently selected city
    document.querySelector(".city--selected").classList.remove("city--selected");
    //add city selected class to newly selected city
    document.querySelector(`#${id}`).classList.add("city--selected");
}