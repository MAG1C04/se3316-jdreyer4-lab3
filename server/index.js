const express = require('express');
const app = express();
var fs = require('fs');

/*const getSuperheroInfo = async () => {
	try{
		const resp = await fetch("superhero_info.json")
		if(resp.ok){
			const superheroInfoJSON = await response.json()
			return superheroInfoJSON
		} else {
			console.error('Super Hero Info JSON File not Retrieved')
		}
	} catch(error){
		console.log("Error: " + error)
	}
};

getSuperheroInfo()
.then(data => {
	console.log(data)
})*/

/*fetch('/superhero_info.json')
.then((response) => response.json())
.then((json) => {
	console.log(json)
	superheroInfo = json
})*/

/*function fetchSuperheroInfo() { 
    fetch("superhero_info.json") 
        .then((res) => { 
        return res.json(); 
    }) 
    .then((data) => {
		console.log(data)
	}); 
}

fetchSuperheroInfo()*/

const superheroInfo = require('./superhero_info.json'); 
const superheroPowers = require('./superhero_powers.json');
let lists = require('./lists.json');

app.use(express.json());

app.use('/', express.static('../client'))

const router = express.Router();

router.route('/getSuperheroByName/:name')
	.get((req, res) => {
		console.log("Response Sent")
		result = getHeroByName(req.params.name)

		res.send(result)
	})

router.route('/getSuperheroByRace/:race')
	.get((req, res) => {
		console.log("Response Sent")
		result = getHeroByRace(req.params.race)

		res.send(result)
	})

router.route('/getSuperheroByPublisher/:publisher')
	.get((req, res) => {
		console.log("Response Sent")
		result = getHeroByPublisher(req.params.publisher)

		res.send(result)
	})

router.route('/getSuperheroByPower/:power')
	.get((req, res) => {
		console.log("Response Sent")
		result = getHeroByPower(req.params.power)

		res.send(result)
	})

router.route('/getSuperheroByID/:id')
	.get((req, res) => {
		console.log("Response Sent")
		result = getHeroByID(req.params.id)

		res.send(result)
	})

router.route('/list/:listName')
	.get((req, res) => {
		let list = lists[req.params.listName];
		if(list){
			res.send(JSON.stringify(list));
		} else {
			res.status(404).send("List Not Found");
		}
	})
	.put((req, res) => {
		let listName = req.params.listName;
		if (lists[listName]){
			res.status(400).send("List Already Exists")
		} else {
			const newList = req.body;
			fs.readFile('lists.json', 'utf8', function readFileCallback(err, data){
				if (err){
					console.log(err);
				} else {
				obj = JSON.parse(data); //now it an object
				obj[listName] = newList;
				json = JSON.stringify(obj); //convert it back to json
				fs.writeFile('lists.json', json, 'utf8', function(){res.status(200).send(newList)}); // write it back 
			}});
		}
	})
	.post((req, res) => {
		let listName = req.params.listName;
		if (lists[listName]){
			const newList = req.body;
			fs.readFile('lists.json', 'utf8', function readFileCallback(err, data){
				if (err){
					console.log(err);
				} else {
				obj = JSON.parse(data); //now it an object
				obj[listName] = newList;
				json = JSON.stringify(obj); //convert it back to json
				fs.writeFile('lists.json', json, 'utf8', function(){res.status(200).send(newList)}); // write it back 
			}});
		} else {
			res.status(404).send("List Not Found")
		}
	})
	.delete((req, res) => {
		let listName = req.params.listName;
		if (lists[listName]){
			fs.readFile('lists.json', 'utf8', function readFileCallback(err, data){
				if (err){
					console.log(err);
				} else {
				obj = JSON.parse(data); //now it an object
				delete obj[listName];
				json = JSON.stringify(obj); //convert it back to json
				fs.writeFile('lists.json', json, 'utf8', function(){res.status(200).send("Successfully Deleted")}); // write it back 
			}});
		} else {
			res.status(404).send("List Not Found")
		}
	})

app.use('/api', router)
const port = 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

function getHeroByName(name){
	console.log("Search: " + name)
	let results = [];
	for(let i=0; i<superheroInfo.length; i++){
		if(superheroInfo[i].name.includes(name)){
			for(let j=0; j<superheroPowers.length; j++){
				if(superheroPowers[j].hero_names == superheroInfo[i].name){
					superheroInfo[i].Powers = superheroPowers[j]
				}
			}
			results.push(JSON.stringify(superheroInfo[i]));
		}
	}
	return results;
}

function getHeroByRace(race){
	console.log("Search: " + race)
	let results = [];
	for(let i=0; i<superheroInfo.length; i++){
		if(superheroInfo[i].Race.includes(race)){
			for(let j=0; j<superheroPowers.length; j++){
				if(superheroPowers[j].hero_names == superheroInfo[i].name){
					superheroInfo[i].Powers = superheroPowers[j]
				}
			}
			results.push(JSON.stringify(superheroInfo[i]));
		}
	}
	return results;
}

function getHeroByPublisher(publisher){
	console.log("Search: " + publisher)
	let results = [];
	for(let i=0; i<superheroInfo.length; i++){
		if(superheroInfo[i].Publisher.includes(publisher)){
			for(let j=0; j<superheroPowers.length; j++){
				if(superheroPowers[j].hero_names == superheroInfo[i].name){
					superheroInfo[i].Powers = superheroPowers[j]
				}
			}
			results.push(JSON.stringify(superheroInfo[i]));
		}
	}
	return results;
}

function getHeroByPower(powerSearch){
	console.log("Search: " + powerSearch)
	let results = [];
	for(let i=0; i<superheroPowers.length; i++){
		for(let power in superheroPowers[i]){
			if(power.includes(powerSearch) && superheroPowers[i][power] == "True"){
				heroResult = getHeroByName(superheroPowers[i]["hero_names"])[0];
				results.push(heroResult)
			}
		}
	}
	return results;
}

function getHeroByID(id){
	console.log("Search: " + id)
	let results = {};
	for(let i=0; i<superheroInfo.length; i++){
		if(superheroInfo[i].id == id){
			for(let j=0; j<superheroPowers.length; j++){
				if(superheroPowers[j].hero_names == superheroInfo[i].name){
					superheroInfo[i].Powers = superheroPowers[j]
				}
			}
			return JSON.stringify(superheroInfo[i]);
		}
	}
	return results;
}