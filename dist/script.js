const mealsW = document.querySelector('.meals-w')
const preview= document.querySelector('.single-meal-w')
const input = document.getElementById('search')
const form = document.forms[0]
const error= document.querySelector('[data-error]')
const shadow =document.querySelector('.shadow')
const previewBox=document.querySelector('.preview-box')

fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then(res => res.json())
    .then(data => createCards(data.meals))


input.addEventListener('keyup', (e) => {
    e.preventDefault()
    error.innerHTML=''
})



form.addEventListener('submit' , (e) => {
    e.preventDefault()
    const pasto = input.value
    if(pasto =="") {
        error.innerHTML='Per favore riempi il campo prima di effettuare una ricerca'
        return
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${pasto}`)
        .then(res => res.json())
        .then(data => {
            if(data.meals == null) {
                error.innerHTML=`impossibile trovare "${pasto}" </br> scrivere correttamente il nome`
            } else {
                meals= data.meals
                console.log(meals);
                createCards(meals)
            }
        })
})


function createCards(meals) {
     mealsW.innerHTML= meals.map(meal => {
      return   `
              <div class="card" id=${meal.idMeal}>
                    <div class="img-cont">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <h3>${meal.strMeal}</h3>
                </div>   
         `
     }).join("")
}



mealsW.addEventListener('click', (e) => {
    e.preventDefault()
    const card = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('card')
        }else {
            return false
        }
    })
    console.log(card.id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${card.id}`)
    .then(res => res.json())
    .then(data => {
        meal=data.meals[0]
        generaPreview(meal)
    })
})


function generaPreview(meal) {
    console.log(meal);
    const arrayIngredients=[]
    let i = 2
    Object.keys(meal).forEach((key) => {
        if(key.startsWith("strIngredient") && meal[key] !== "" && !key.startsWith("strIngredient1")) {
            let ingrediente = `${meal[key]} - ${meal[`strMeasure${i-10}`]}`
            arrayIngredients.push(ingrediente)
        }
        i++
    })
    i=0
    console.log(arrayIngredients);
    preview.classList.add('--show')
    document.body.style.overflow='hidden'
    previewBox.innerHTML= `
       <h2>${meal.strMeal}</h2>
       <div class="img-cont">
          <img src=${meal.strMealThumb} alt="${meal.strMeal}">
       </div>
       <h3>Video : <a href=${meal.strYoutube}>${meal.strYoutube}</a> </h3>
       <h3>Istruzioni : <span>${meal.strInstructions}</span> </h3>
       <h3>Ingredienti : <span>${meal.strIngredient1} - ${meal.strMeasure1}</span>
       <ul>
           ${arrayIngredients.map(ingrediente => {
            return `
                <li>${ingrediente}</li>
            `
           }).join("")}
       </ul>
   </h3>
   </video>
    `
}



shadow.addEventListener('click', (e)=> {
    e.preventDefault()
    shadow.parentElement.classList.remove('--show')
    document.body.style.overflow='scroll'
})




// fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata')
// .then(res => {
//  return res.json()
// })
// .then((data) =>{
//     console.log(data);
//     createCard(data)    
// })

// function createCard(data) {
//     mealsW.innerHTML = `
//     <div class="card">
//           <div class="img-cont">
//               <img src="${data.meals[0].strMealThumb}" alt="">
//           </div>
//           <h3>${data.meals[0].strMeal}</h3>
//       </div>
// `
// }


