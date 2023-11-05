let search = document.getElementById("superHeroSearchBar");

let searchName = document.getElementById("searchName");
let searchRace = document.getElementById("searchRace");
let searchPublisher = document.getElementById("searchPublisher");
let searchPower = document.getElementById("searchPower");

searchName.addEventListener('click', searchByName);
searchRace.addEventListener('click', searchByRace);
searchPublisher.addEventListener('click', searchByPublisher);
searchPower.addEventListener('click', searchByPower);

let resultActions = document.getElementById("resultActions");
let resultsSection = document.getElementById("results");

let sortName = document.getElementById("sortByName");
let sortRace = document.getElementById("sortByRace");
let sortPublisher = document.getElementById("sortByPublisher");
let sortPower = document.getElementById("sortByPower");

function searchByName(){
    console.log("Searching for Name")
    fetch(`/api/getSuperhero/${search.value}`)
    .then(res => res.json()
    .then(data => {
        //data = JSON.parse(data)
        console.log(data)
        for(let i=0; i<data.length; i++){
            let hero = JSON.parse(data[i])
            let result = document.createElement("li");
            result.className = "searchResult";
            result.innerText = `ID: ${hero.id}
                \nName: ${hero.name}
                \nGender: ${hero.Gender}
                \nEye Color: ${hero["Eye color"]}
                \nRace: ${hero.Race}
                \nHair Color: ${hero["Hair color"]}
                \nHeight: ${hero.Height}
                \nPublisher: ${hero.Publisher}
                \nSkin Color: ${hero["Skin color"]}
                \nAlignment: ${hero.Alignment}
                \nWeight: ${hero.Weight}`
            resultsSection.appendChild(result);
        }
    }))
}

function searchByRace(){
    
}

function searchByPublisher(){
    
}

function searchByPower(){
    
}