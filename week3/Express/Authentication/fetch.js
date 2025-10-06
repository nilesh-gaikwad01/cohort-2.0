
//The function call and fetch the data

const { json } = require("zod")

function getAnimaldata(){
    fetch("https://fakerapi.it/api/v1/person")
    .then(function (response){
        response.json()

}).then(function(finaldata){

    console.log(finaldata);
    
})

}

getAnimaldata(); // function call


// get the api data using async function

async function getAnimaldata() {
   const response =  await fetch();
   const finaldata = await response.json()
   console.log(finaldata);
   
}

getAnimaldata(); 