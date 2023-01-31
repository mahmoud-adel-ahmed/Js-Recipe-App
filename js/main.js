// let url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;
// https://www.themealbb.com/api/json/v1/1/lookup.php?i=(id)

let searchBtn = document.querySelector(".search-btn");
let recipesContainer = document.querySelector(".recipes");
let recipesDetails = document.querySelector(".recipes-details");

let recipeInp = document.querySelector(".recipe");

let searchTerm = "beef";

function drawUiRecipes(meals = [], errorMsg = null) {
  let recipe = meals?.map((recipe) => {
    return `<div class="box">
        <div class="img">
            <img src="${recipe.strMealThumb}" alt="food" />
        </div>
        <p class="desc">${recipe.strMeal}</p>
        <button class="btn" onclick="getRecipeDetails(${recipe.idMeal})">Get Recipe</button>
     </div>
    `;
  });
  recipesContainer.innerHTML +=
    recipe?.join("") || `<h2 class="error">${errorMsg}</h2>`;
}

async function getRepos(searchTerm) {
  try {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${
        searchTerm || "pork"
      }`
    );
    if (response.ok) {
      let recipes = await response.json();
      if (recipes.meals) {
        drawUiRecipes(recipes?.meals);
      } else {
        throw new Error("couldn't find this recipe!");
      }
      return;
    }
  } catch (error) {
    drawUiRecipes([], error.message);
  }
}

getRepos();

function updateRecipe() {
  recipesContainer.innerHTML = "";
  getRepos(recipeInp?.value || "");
  recipeInp.value = "";
}

searchBtn.addEventListener("click", updateRecipe);

async function getRecipeDetails(id) {
  console.log(id);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let recipe = await response.json();
  recipesDetails.innerHTML = "";
  viewRecipeDeatils(recipe.meals[0]);
}

function viewRecipeDeatils(recipe) {
  recipesDetails.classList.add("active");
  recipesDetails.innerHTML = `
        <button onclick="closeRecipe()">
          <i class="fas fa-times"></i>
        </button>
        <div class="content">
          <h3 class="recipes-name">${recipe.strMeal}</h3>
          <div class="img">
                <img src="${recipe.strMealThumb}" alt="food" />
          </div>
          <p class="recipes-desc">
            <span>instructions:</span>
            ${recipe.strInstructions}
          </p>
          <a href="${recipe.strYoutube}" target="_blank">watch now</a>
        </div>
`;
}

function closeRecipe() {
  recipesDetails.classList.remove("active");
}
