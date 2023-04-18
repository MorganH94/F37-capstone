const recipesContainer = document.querySelector('#recipes-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/recipes`

const recipesCallback = ({ data: recipes }) => displayRecipes(recipes)
const errCallback = err => console.log(err)

const getAllRecipes = () => axios.get(baseURL).then(recipesCallback).catch(errCallback)
const createRecipe = body => axios.post(baseURL, body).then(recipesCallback).catch(errCallback)
const deleteRecipe = id => axios.delete(`${baseURL}/${id}`).then(recipesCallback).catch(errCallback)
const updateRecipe = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(recipesCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let recipeTitle = document.querySelector('#recipeTitle')
    let recipeLink = document.querySelector('#recipeLink')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        recipeTitle: recipeTitle.value,
        recipeLink: recipeLink.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }

    createRecipe(bodyObj)

    recipeTitle.value = ''
    recipeLink.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createRecipeCard(recipe) {
    const recipeCard = document.createElement('div')
    recipeCard.classList.add('recipe-card')

    recipeCard.innerHTML = `<img alt='recipe cover image' src=${recipe.imageURL} class="recipe-cover-image"/>
    <p class="recipeTitle">${recipe.recipeTitle}</p>
    <p class="recipeLink">${recipe.recipeLink}</p>
    <div class="btns-container">
        <button onclick="updateRecipe(${recipe.id}, 'minus')">-</button>
    
        <p class="recipe-recipeRatig">${recipe.rating} stars</p>
        <button onclick="updateRecipe(${recipe.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteRecipe(${recipe.id})">delete</button>
    `


    recipesContainer.appendChild(recipeCard)
}

function displayRecipes(arr) {
    recipesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createRecipeCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllRecipes()