

let searchInput = document.getElementById("search-input")

let searchBtn = document.querySelector(".search-btn")

let resultArea = document.querySelector(".result-area")

window.onload = function(){
    let name = searchInput.value.trim()
    let ulr = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
    fetch(ulr).then(res=>{
        data = res.json()
        return data
    })
    .then(data=>{
        displayRecipies(data)
    }).catch(err=>{
        console.log(err)
    })
}

searchInput.addEventListener("change" , getRecipies)

searchBtn.addEventListener("click" , getRecipies)

resultArea.addEventListener("click" , getDetails)


function getRecipies(){
    let name = searchInput.value.trim()
    let ulr = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
    fetch(ulr).then(res=>{
        data = res.json()
        return data
    })
    .then(data=>{
        displayRecipies(data)
    }).catch(err=>{
        console.log("No Items")
    })
}


function displayRecipies(Recipies){
    if(Recipies.meals===null){
        resultArea.innerHTML ="No results"
        
    }else{
        resultArea.innerHTML =""

        Recipies.meals.forEach(meal => {
            resultArea.innerHTML += ` 
            <div class="card">
            <div class="card-image">
              <img src="${meal.strMealThumb}" alt="" />
            </div>
            <div class="card-info">
              <h2>${meal.strMeal}</h2>
              <a data-id=${meal.idMeal} class="details-btn" >Get More</a>
            </div>
          </div>`
            
        });
    }

}

function getDetails(e){

    if(e.target.classList.contains("details-btn")){

        let id = e.target.getAttribute("data-id")
        

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res=>{
            data = res.json()
            return data
        }).then(data=>{
            let meals = data.meals[0]
            console.log(meals)
            showDetails(meals)
        })
    }

}

function showDetails(item){

    document.querySelector(".details").innerHTML =`
    <i class="fa fa-times" onclick="removeDetails()"></i>
    <h2>${item.strMeal}</h2>
    <p>Prescripton :</p>
    <p>
    ${item.strInstructions}
    </p>
    <a href=${item.strYoutube}>Watch Vedio</a>`
    document.querySelector(".details").classList.add("show")

}


function removeDetails(){

    document.querySelector(".details").classList.remove("show")
}

