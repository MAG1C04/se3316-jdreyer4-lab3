let search = document.getElementById("superHeroSearchBar");
let numOfResults = document.getElementById("numOfResults");

let searchName = document.getElementById("searchName");
let searchRace = document.getElementById("searchRace");
let searchPublisher = document.getElementById("searchPublisher");
let searchPower = document.getElementById("searchPower");
let errorMessage = document.getElementById("errorMessage");
let enterNumOfResultsBtn = document.getElementById("enterNumOfResults");

searchName.addEventListener('click', searchByName);
searchRace.addEventListener('click', searchByRace);
searchPublisher.addEventListener('click', searchByPublisher);
searchPower.addEventListener('click', searchByPower);
enterNumOfResultsBtn.addEventListener('click', enterNumOfResults);

let listSearchBar = document.getElementById("listSearchBar");

let findList = document.getElementById("findList");
let editList = document.getElementById("editList");
let deleteList = document.getElementById("deleteList");
let createList = document.getElementById("createList");

findList.addEventListener('click', search_list);
editList.addEventListener('click', edit_list);
deleteList.addEventListener('click', delete_list);
createList.addEventListener('click', create_list);

let resultActions = document.getElementById("resultActions");
let resultsSection = document.getElementById("results");

let sortName = document.getElementById("sortByName");
let sortRace = document.getElementById("sortByRace");
let sortPublisher = document.getElementById("sortByPublisher");
let sortPower = document.getElementById("sortByPower");
let displayPublishersBtn = document.getElementById("displayPublishersBtn");

sortName.addEventListener('click', sortByName);
sortRace.addEventListener('click', sortByRace);
sortPublisher.addEventListener('click', sortByPublisher);
sortPower.addEventListener('click', sortByPower);
displayPublishersBtn.addEventListener('click', displayPublishers);

let selected = []
let lastResults = []

function searchByName(){
    clearResults()
    console.log("Searching for Name")
    fetch(`/api/getSuperheroByName/${search.value}`)
    .then(res => res.json()
    .then(data => {
        if(res.status != 200){
            console.log(res.status)
            errorMessage.textContent = "Error: Please provide valid input"
        }
        else {
            console.log(data)
            lastResults = data
            generateResults(lastResults)
        }
    }))
}

function searchByRace(){
    clearResults()
    console.log("Searching for Race")
    fetch(`/api/getSuperheroByRace/${search.value}`)
    .then(res => res.json()
    .then(data => {
        if(res.status != 200){
            console.log(res.status)
            errorMessage.textContent = "Error: Please provide valid input"
        }
        else {
            console.log("In Else: " + res.status)
            console.log(data)
            lastResults = data
            generateResults(lastResults)
        }
    }))
}

function searchByPublisher(){
    clearResults()
    console.log("Searching for Publisher")
    fetch(`/api/getSuperheroByPublisher/${search.value}`)
    .then(res => res.json()
    .then(data => {
        if(res.status != 200)
            errorMessage.textContent = "Error: Please provide valid input"
        else {
            console.log(data)
            lastResults = data
            generateResults(lastResults)
        }
    }))
}

function searchByPower(){
    clearResults()
    console.log("Searching for Name")
    fetch(`/api/getSuperheroByPower/${search.value}`)
    .then(res => res.json()
    .then(data => {
        if(res.status != 200)
            errorMessage.textContent = "Error: Please provide valid input"
        else {
            console.log(data)
            lastResults = data
            generateResults(lastResults)
        }
    }))
}

function enterNumOfResults(){
    fetch(`/api/numOfResults/${numOfResults.value}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
    })
}

function addSelected(e){
    let heroId = e.target.parentElement.lastChild.getElementsByClassName("id")[0].textContent;
    if(e.target.checked){
        selected.push(heroId);
    } else {
        selected.splice(selected.indexOf(heroId), 1);
    }
    console.log(heroId)
    console.log(selected)
}

function clearResults(){
    while(resultsSection.lastChild){
        resultsSection.removeChild(resultsSection.lastChild)
    }
}

function search_list(){
    fetch(`/api/list/${listSearchBar.value}`)
    .then(res => res.json()
    .then(data => {
        if(res.status == 404)
            errorMessage.textContent = "Error: List Not Found"
        else if (res.status == 400)
            errorMessage.textContent = "Error: Please Use Only Valid Characters"
        clearResults()
        for(let i=0; i<data.length; i++){
            fetch(`/api/getSuperheroByID/${data[i]}`)
            .then(res => res.json()
            .then(heroInfo => {
                if(res.status == 404)
                    errorMessage.textContent = "Error: List Not Found"
                else if (res.status == 400)
                    errorMessage.textContent = "Error: Please Use Only Valid Characters"
                else{
                let hero = heroInfo
                let result = document.createElement("li");
                result.className = "searchResult";

                let attributes = document.createElement("ul");

                let checkBox = document.createElement('input');
                checkBox.type = "checkbox";
                checkBox.value = 1;
                checkBox.name = "Select []"

                let resultName = document.createElement("li");
                resultName.className = "name";
                resultName.textContent = hero.name;

                result.appendChild(resultName);
            
                let resultId = document.createElement("li");
                resultId.className = "id";
                resultId.textContent = hero.id;
                attributes.appendChild(resultId);

                let resultGender = document.createElement("li");
                resultGender.className = "gender";
                resultGender.textContent = hero.Gender;
                attributes.appendChild(resultGender);

                let resultEyeColor = document.createElement("li");
                resultEyeColor.className = "eyecolor";
                resultEyeColor.textContent = hero["Eye color"];
                attributes.appendChild(resultEyeColor);

                let resultRace = document.createElement("li");
                resultRace.className = "race";
                resultRace.textContent = hero.Race;
                attributes.appendChild(resultRace);

                let resultHairColor = document.createElement("li");
                resultHairColor.className = "haircolor";
                resultHairColor.textContent = hero["Hair color"];
                attributes.appendChild(resultHairColor);

                let resultHeight = document.createElement("li");
                resultHeight.className = "height";
                resultHeight.textContent = hero.Height;
                attributes.appendChild(resultHeight);

                let resultPublisher = document.createElement("li");
                resultPublisher.className = "publisher";
                resultPublisher.textContent = hero.Publisher;
                attributes.appendChild(resultPublisher);

                let resultSkinColor = document.createElement("li");
                resultSkinColor.className = "skincolor";
                resultSkinColor.textContent = hero["Skin color"];
                attributes.appendChild(resultSkinColor);

                let resultAlignment = document.createElement("li");
                resultAlignment.className = "alignment";
                resultAlignment.textContent = hero.Alignment;
                attributes.appendChild(resultAlignment);

                let resultWeight = document.createElement("li");
                resultWeight.className = "weight";
                resultWeight.textContent = hero.Weight;
                attributes.appendChild(resultWeight);

                let resultPower = document.createElement("li");
                resultPower.className = "power";
                resultPower.textContent = hero.Powers;
                attributes.appendChild(resultPower);
            
                result.appendChild(checkBox)
                result.lastChild.addEventListener('click', addSelected)
                result.appendChild(attributes)

                resultsSection.appendChild(result);
                }
            }));
        }
    }))
}

function edit_list(){
    fetch(`/api/list/${listSearchBar.value}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(selected)
    })
    .then(res => {
        console.log(res.status + " " + res.body)
        if(res.status == 404)
            errorMessage.textContent = "Error: List Not Found"
        else if (res.status == 400)
            errorMessage.textContent = "Error: Please Use Only Valid Characters"
    })
}

function delete_list(){
    fetch(`/api/list/${listSearchBar.value}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(selected)
    })
    .then(res => {
        console.log(res.status + " " + res.body)
        if(res.status == 404)
            errorMessage.textContent = "Error: List Not Found"
        else if (res.status == 400)
            errorMessage.textContent = "Error: Please Use Only Valid Characters"
    })
}

function create_list(){
    fetch(`/api/list/${listSearchBar.value}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(selected)
    })
    .then(res => {
        console.log(res.status + " " + res.body)
        if(res.status == 300)
            errorMessage.textContent = "Error: List Already Created"
        else if (res.status == 400)
            errorMessage.textContent = "Error: Please Use Only Valid Characters"
    })
    .catch(res => console.log(res.status + " " + res.body))
}
function displayPublishers(){
    fetch('/api/publishers')
    .then(res => res.json()
    .then(data => {
        clearResults()

        let temp = document.createElement("li");
        temp.className = "Descriptor";
        temp.textContent = "Publishers:";
        resultsSection.appendChild(temp);

        let publishers = data
        for(let i=0; i<publishers.list.length; i++){
            let category = document.createElement("li");
            category.className = "category";
            category.textContent = publishers.list[i];
            resultsSection.appendChild(category);
        }
    }))
}

function sortByName(){
    lastResults.sort(function(a,b){return JSON.parse(a).name.localeCompare(JSON.parse(b).name)})
    clearResults()
    generateResults(lastResults)
}

function sortByPower(){
    lastResults.sort(function(a,b){
        let aPowers = JSON.parse(a).Powers;
        let aPowerCount = 0;
        for(let power in aPowers){
            if(aPowers[power] == "True"){
                aPowerCount++;
            }
        }

        let bPowers = JSON.parse(b).Powers;
        let bPowerCount = 0;
        for(let power in bPowers){
            if(bPowers[power] == "True"){
                bPowerCount++;
            }
        }

        return aPowerCount-bPowerCount;
    })
    clearResults()
    generateResults(lastResults)
}

function sortByPublisher(){
    lastResults.sort(function(a,b){return JSON.parse(a).Publisher.localeCompare(JSON.parse(b).Publisher)})
    clearResults()
    generateResults(lastResults)
}

function sortByRace(){
    console.log(lastResults[0])
    lastResults.sort(function(a,b){return JSON.parse(a).Race.localeCompare(JSON.parse(b).Race)})
    clearResults()
    generateResults(lastResults)
}

function generateResults(data){
    for(let i=0; i<data.length; i++){
        let hero = JSON.parse(data[i])
        let result = document.createElement("li");
        result.className = "searchResult";

        let attributes = document.createElement("ul");

        let checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        checkBox.value = 1;
        checkBox.name = "Select []"

        let resultName = document.createElement("li");
        resultName.className = "name";
        resultName.textContent = hero.name;

        result.appendChild(resultName);
        
        let resultId = document.createElement("li");
        resultId.className = "id";
        resultId.textContent = hero.id;
        attributes.appendChild(resultId);

        let resultGender = document.createElement("li");
        resultGender.className = "gender";
        resultGender.textContent = hero.Gender;
        attributes.appendChild(resultGender);

        let resultEyeColor = document.createElement("li");
        resultEyeColor.className = "eyecolor";
        resultEyeColor.textContent = hero["Eye color"];
        attributes.appendChild(resultEyeColor);

        let resultRace = document.createElement("li");
        resultRace.className = "race";
        resultRace.textContent = hero.Race;
        attributes.appendChild(resultRace);

        let resultHairColor = document.createElement("li");
        resultHairColor.className = "haircolor";
        resultHairColor.textContent = hero["Hair color"];
        attributes.appendChild(resultHairColor);

        let resultHeight = document.createElement("li");
        resultHeight.className = "height";
        resultHeight.textContent = hero.Height;
        attributes.appendChild(resultHeight);

        let resultPublisher = document.createElement("li");
        resultPublisher.className = "publisher";
        resultPublisher.textContent = hero.Publisher;
        attributes.appendChild(resultPublisher);

        let resultSkinColor = document.createElement("li");
        resultSkinColor.className = "skincolor";
        resultSkinColor.textContent = hero["Skin color"];
        attributes.appendChild(resultSkinColor);

        let resultAlignment = document.createElement("li");
        resultAlignment.className = "alignment";
        resultAlignment.textContent = hero.Alignment;
        attributes.appendChild(resultAlignment);

        let resultWeight = document.createElement("li");
        resultWeight.className = "weight";
        resultWeight.textContent = hero.Weight;
        attributes.appendChild(resultWeight);

        let resultPowers = document.createElement("ul");
        resultPowers.className = "power";
        //resultPower.textContent = hero.Powers;
        for(let power in hero.Powers){
            if(hero.Powers[power] == "True"){
                singlePower = document.createElement("li");
                singlePower.textContent = power;
                resultPowers.appendChild(singlePower);
            }
        }
        attributes.appendChild(resultPowers);
        
        result.appendChild(checkBox)
        result.lastChild.addEventListener('click', addSelected)
        result.appendChild(attributes)

        resultsSection.appendChild(result);
    }
}