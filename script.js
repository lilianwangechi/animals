//Event Listeners
document.querySelector('#animal-form').addEventListener('submit',handleSubmit)

//event handlers
function handleSubmit(e){
  e.preventDefault()
  let animalObj = {
    name:e.target.name.value,
    imageUrl:e.target.image_url.value,
    description:e.target.description.value,
    donations:0
  }
  renderOneAnimal(animalObj)
  adoptAnimal(animalObj)
}

//DOM Render Functions
function renderOneAnimal(animal){
  //Build Animal
  let card = document.createElement('li')
  card.className = 'card'
  card.id = animal
  card.innerHTML = `
  <img src ="${animal.imageUrl}">
  <div class="content">
  <h4>${animal.name}</h4>
  <p>
      $<span class="donation-count">${animal.donations}</span> Donated
  </p>${animal.description}</p>

  </div>
  <div class ="buttons">
  <button id='donate'> Donate $10 </button>
  <button id='set_free'> Set Free </button> <br><br>
 
  </div>
`
card.querySelector('#donate').addEventListener('click',()=> {
  animal.donations+=10
  card.querySelector('span').textContent = animal.donations
  updateDonation(animal)
})

card.querySelector('#set_free').addEventListener('click',()=>{
//card.innerHTML=''  this deletes the animal card
card.remove()
deleteAnimal(animal.id)
})

//console.log(card)
//add animal to dom
document.querySelector('#animal-list').appendChild(card)
}
//Fetch requests to get data fromdb.json to the index.js
//Get Fetch for all animal resources
function getAllAnimals(){
  fetch('http://localhost:3000/animalData')
  .then(res => res.json())
  .then(animalData => animalData.forEach(animal => renderOneAnimal(animal)))
}

//fetch():post animalObj is the data that we are posting in db.json through fetch Post request
//
// function adoptAnimal(animalObj){
//   fetch('http://localhost:3000/animalData',{
//     method:'POST',
//     headers:{
//       'Content-Type':'application/json',
//       'Accept': 'application/json'
//     },
//     body:JSON.stringify(animalObj)
//   })
//   .then(res => res.json())
//   .then(animal => console.log(animal))
// }

//fetch() patch request
// function updateDonation(animalObj){
//   fetch(`http://localhost:3000/animalData/${animalObj.id}`,{
//     method:'PATCH',
//     headers:{
//       'Content-Type':'application/json'
//     },
//     body:JSON.stringify(animalObj)
//   })
//   .then(res => res.json())
//   .then(animal => console.log(animal))

// }

//fetch()delete request
function deleteAnimal(id){
fetch(`http://localhost:3000/animalData/${id}`,{
  method:'DELETE',
  headers:{
    'Content-Type':'application/json'
  }
})
.then(res => res.json())
.then(animal => console.log(animal))
}


//initial Render
//Get Data and render our animals to the DOM
function initialize(){
  getAllAnimals()
  //animalData.forEach(animal => renderOneAnimal(animal))
}
initialize()