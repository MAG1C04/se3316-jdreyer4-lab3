let search = document.getElementById("superHeroSearchBar");

let searchName = document.getElementById("searchName");
let searchRace = document.getElementById("searchRace");
let searchPublisher = document.getElementById("searchPublisher");
let searchPower = document.getElementById("searchPower");

searchName.addEventListener('click', searchByName);
searchRace.addEventListener('click', searchByRace);
searchPublisher.addEventListener('click', searchByPublisher);
searchPower.addEventListener('click', searchByPower);

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

let selected = []
let lastResults = []

function searchByName(){
    clearResults()
    console.log("Searching for Name")
    fetch(`/api/getSuperheroByName/${search.value}`)
    .then(res => res.json()
    .then(data => {
        //data = JSON.parse(data)
        console.log(data)
        lastResults = data
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

            let resultPower = document.createElement("li");
            resultPower.className = "power";
            resultPower.textContent = hero.Powers;
            attributes.appendChild(resultPower);
            
            result.appendChild(checkBox)
            result.lastChild.addEventListener('click', addSelected)
            result.appendChild(attributes)

            resultsSection.appendChild(result);
        }
    }))
}

function searchByRace(){
    clearResults()
    console.log("Searching for Race")
    fetch(`/api/getSuperheroByRace/${search.value}`)
    .then(res => res.json()
    .then(data => {
        //data = JSON.parse(data)
        console.log(data)
        lastResults = data
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

            let resultPower = document.createElement("li");
            resultPower.className = "power";
            resultPower.textContent = hero.Powers;
            attributes.appendChild(resultPower);
            
            result.appendChild(checkBox)
            result.lastChild.addEventListener('click', addSelected)
            result.appendChild(attributes)

            resultsSection.appendChild(result);
        }
    }))
}

function searchByPublisher(){
    clearResults()
    console.log("Searching for Publisher")
    fetch(`/api/getSuperheroByPublisher/${search.value}`)
    .then(res => res.json()
    .then(data => {
        //data = JSON.parse(data)
        console.log(data)
        lastResults = data
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

            let resultPower = document.createElement("li");
            resultPower.className = "power";
            resultPower.textContent = hero.Powers;
            attributes.appendChild(resultPower);
            
            result.appendChild(checkBox)
            result.lastChild.addEventListener('click', addSelected)
            result.appendChild(attributes)

            resultsSection.appendChild(result);
        }
    }))
}

function searchByPower(){
    clearResults()
    console.log("Searching for Name")
    fetch(`/api/getSuperheroByPower/${search.value}`)
    .then(res => res.json()
    .then(data => {
        //data = JSON.parse(data)
        console.log(data)
        lastResults = data
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

            let resultPower = document.createElement("li");
            resultPower.className = "power";
            resultPower.textContent = hero.Powers;
            attributes.appendChild(resultPower);
            
            result.appendChild(checkBox)
            result.lastChild.addEventListener('click', addSelected)
            result.appendChild(attributes)

            resultsSection.appendChild(result);
        }
    }))
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
        for(let i=0; i<data.length; i++){
            fetch(`/api/getSuperheroByID/${data[i]}`)
            .then(res => res.json()
            .then(heroInfo => {
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
    .then(res => console.log(res.status + " " + res.body))
}

function delete_list(){
    fetch(`/api/list/${listSearchBar.value}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(selected)
    })
    .then(res => console.log(res.status + " " + res.body))
}

function create_list(){
    fetch(`/api/list/${listSearchBar.value}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(selected)
    })
    .then(res => console.log(res.status + " " + res.body))

}