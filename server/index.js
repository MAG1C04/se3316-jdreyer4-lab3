const express = require('express');
const app = express();

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

app.use(express.json());

app.use('/', express.static('../client'))

const router = express.Router();

router.route('/getSuperhero/:name')
	.get((req, res) => {
		console.log("Response Sent")
		result = getHeroByName(req.params.name)

		res.send(result)
	})


app.use('/api', router)
const port = 3000;
app.listen(port, () => console.log(`Listening on Port ${port}...`));

function getHeroByName(name){
	console.log("Search: " + name)
	let results = [];
	for(let i=0; i<superheroInfo.length; i++){
		if(superheroInfo[i].name.includes(name)){
			results.push(JSON.stringify(superheroInfo[i]));
		}
	}
	return results;
}