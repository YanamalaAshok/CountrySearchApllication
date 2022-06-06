let spinnerEl = document.getElementById("spinner");
let searchInputEl = document.getElementById("searchInput");
let resultCountriesEl = document.getElementById("resultCountries");

let searchInputVal = "";
let countriesList = [];

function createAndAppendCountry(country) {
    let countryEl = document.createElement("div");
    countryEl.classList.add("country-card", "col-11", "col-md-5", "ml-auto", "mr-auto", "d-flex", "flex-row");
    resultCountriesEl.appendChild(countryEl);

    let flagEl = document.createElement("img");
    flagEl.src = country.flag;
    flagEl.classList.add("mt-auto", "mb-auto", "country-flag");
    countryEl.appendChild(flagEl);

    let infoEl = document.createElement("div");
    infoEl.classList.add("d-flex", "flex-column", "ml-4");
    countryEl.appendChild(infoEl);

    let nameEl = document.createElement("p");
    nameEl.textContent = country.name;
    nameEl.classList.add("country-name");
    infoEl.appendChild(nameEl);

    let populationEl = document.createElement("p");
    populationEl.classList.add("country-population");
    populationEl.textContent = country.population;
    infoEl.appendChild(populationEl);
}

function displaySearchResults() {
    resultCountriesEl.textContent = "";
    for (let country of countriesList) {
        let countryName = country.name;
        if (countryName.toLowerCase().includes(searchInputVal.toLowerCase())) {
            createAndAppendCountry(country);
        }
    }
}

function getCountries() {
    let url = "https://apis.ccbp.in/countries-data";
    let options = {
        method: "GET"
    };
    spinnerEl.classList.toggle("d-none");

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinnerEl.classList.toggle("d-none");
            countriesList = jsonData;
            displaySearchResults();
        });
}

function onChangeInputSearch(event) {
    searchInputVal = event.target.value;
    displaySearchResults();
}
getCountries();
searchInputEl.addEventListener("keyup", onChangeInputSearch);