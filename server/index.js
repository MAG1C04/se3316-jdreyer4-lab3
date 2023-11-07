const express = require('express');
const app = express();
var fs = require('fs');

const superheroInfo = require('./superhero_info.json'); 
const superheroPowers = require('./superhero_powers.json');
let lists = require('./lists.json');

app.use(express.json());

app.use('/', express.static('../client'))

const router = express.Router();

let numOfResults = -1;

router.route('/getSuperheroByName/:name')
	.get((req, res) => {
		if(!inputSanitization(req.params.name)){
			res.status(400).send(JSON.stringify("Input must contain only letters, dashes, periods, and numbers"))
		} else {
			console.log("Response Sent")
			result = getHeroByName(req.params.name)

			res.send(result)
		}
	})

router.route('/getSuperheroByRace/:race')
	.get((req, res) => {
		if(!inputSanitization(req.params.race)){
			res.status(400).send(JSON.stringify("Input must contain only letters, dashes, periods, and numbers"))
		} else {
			console.log("Response Sent")
			result = getHeroByRace(req.params.race)

			res.send(result)
		}
	})

router.route('/getSuperheroByPublisher/:publisher')
	.get((req, res) => {
		if(!inputSanitization(req.params.publisher)){
			res.status(400).send("Input must contain only letters, dashes, periods, and numbers")
		} else {
			console.log("Response Sent")
			result = getHeroByPublisher(req.params.publisher)

			res.send(result)
		}
	})

router.route('/getSuperheroByPower/:power')
	.get((req, res) => {
		if(!inputSanitization(req.params.power)){
			res.status(400).send("Input must contain only letters, dashes, periods, and numbers")
		} else {
			console.log("Response Sent")
			result = getHeroByPower(req.params.power)

			res.send(result)
		}
	})

router.route('/getSuperheroByID/:id')
	.get((req, res) => {
		if(!inputSanitization(req.params.id)){
			res.status(400).send("Input must contain only letters, dashes, periods, and numbers")
		} else {
			console.log("Response Sent")
			result = getHeroByID(req.params.id)

			res.send(result)
		}
	})
router.route('/numOfResults/:quantity')
	.post((req, res) => {
		if(inputSanitization(req.params.quantity) && req.params.quantity > 0){
			numOfResults = req.params.quantity;
		}
	})

router.route('/list/:listName')
	.get((req, res) => {
		let list = lists[req.params.listName];
		if(!inputSanitization(req.params.listName)){
			res.status(400).send("Input must contain only letters, dashes, periods, and numbers")
		}
		else if(list){
			res.send(JSON.stringify(list));
		} else {
			res.status(404).send("List Not Found");
		}
	})
	.put((req, res) => {
		let listName = req.params.listName;
		if(!inputSanitization(listName)){
			res.status(400).send("Input must contain only letters, dashes, periods, and numbers")
		}else if (lists[listName]){
			res.status(300).send("List Already Exists")
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
		if(!inputSanitization(listName)){
			res.status(400).send("Input must contain only letters, dashes, periods, and numbers")
		}
		else if (lists[listName]){
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
		if(!inputSanitization(listName)){
			res.status(400).send("Input must contain only letters, dashes, periods, and numbers")
		}
		else if (lists[listName]){
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

router.route('/publishers')
	.get((req, res) => {
		let results = []
		for(let hero in superheroInfo){
			let heroPublisher = superheroInfo[hero].Publisher
			if(!results.includes(heroPublisher) && heroPublisher){
				results.push(heroPublisher)
			}
		}

		let obj = {
			"list": results
		}

		res.send(JSON.stringify(obj))
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
			if(numOfResults > 0 && results.length >= numOfResults){
				break;
			}
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
			if(numOfResults > 0 && results.length >= numOfResults){
				break;
			}
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
			if(numOfResults > 0 && results.length >= numOfResults){
				break;
			}
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
				if(numOfResults > 0 && results.length >= numOfResults){
					break;
				}
			}
		}
		if(numOfResults > 0 && results.length >= numOfResults){
			break;
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

function inputSanitization(input){
	if(/^[\u00BF-\u1FFF\u2C00-\uD7FF\w]+$/.test(input)){
		console.log("pass test")
		return true;
	} else {
		console.log("fail test")
		return false;
	}
}