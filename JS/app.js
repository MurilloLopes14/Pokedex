// Element selection
const pokeName = document.querySelector("#pokemon_name");
const pokeNumber = document.querySelector("#pokemon_number");
const pokemonImg = document.querySelector(".img_control img");
const queryInput = document.querySelector("#query");
const form = document.querySelector("#form_control");
const btnNext = document.querySelector("#buttons_control #next");
const btnPrev = document.querySelector("#buttons_control #prev");

let searchPokemon = 1;

//Functions
const fetchPokemon = async (pokemon) => {
  const apiRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (apiRes.status === 200) {
    const data = await apiRes.json();

    return data;
  } else if (apiRes.status == 404) {
    return;
  }
};

const renderPokemon = async (pokemon) => {
  // Searching message, remove number & Get pokemon data
  pokeName.innerText = "Carregando...";
  pokeNumber.innerText = "";
  const data = await fetchPokemon(pokemon);

  // With data, set all input, the image and text fields
  if (data) {
    // Image uri to fetch pokemon gif
    const ImgURI =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    //   setting fields . . .
    pokemonImg.style.display = "block";
    pokemonImg.src = ImgURI;
    pokeName.innerHTML = data.name;
    pokeNumber.innerHTML = data.id;
    pokemonImg.src = ImgURI;
    queryInput.value = "";
    searchPokemon = data.id;
  } else {
    // Search error messages and methods
    queryInput.value = "";
    pokemonImg.style.display = "none";
    pokeName.innerText = "Não encontrado";

    // Timeout to clear Not found message
    setTimeout(() => {
      pokeName.innerText = "";
      pokeNumber.innerText = "";
    }, 1500);
  }
};

//Events
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const queryInputFormat = queryInput.value.toLowerCase();

  renderPokemon(queryInputFormat);
});

btnNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

//Default Pokemon Img
renderPokemon(searchPokemon);
