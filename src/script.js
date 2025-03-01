function changeImage(id, url) {
  const element = document.getElementById(id);
  if (element) {
    element.src = url;
  }
}

function changeText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.innerText = text;
  }
}

// Requisição de detalhes do pokemon
async function showPokemon(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro na requisição do Pokémon');
    }
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error('Erro na requisição: ', error);
  }
}

let listPokemons = [];
let currentIndex = 0;

// Requisição para listar pokemons
async function searchPokemons() {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=200');
    if (!response.ok) {
      throw new Error('Erro na requisição');
    }

    const data = await response.json();
    if (!data) {
      throw new Error('Erro na requisição dos dados');
    }

    listPokemons = data.results; 
    // console.log(listPokemons); // Teste

    // primeiro Pokémon
    if (listPokemons.length > 0) {
      updatePokemonDisplay(currentIndex);
    }
  } catch (erro) {
    console.error('Erro na requisição: ', erro);
  }
}

// atualizar Pokemon
async function updatePokemonDisplay(index) {
  if (index < 0) {
    index = listPokemons.length - 1; // Vai para o último 
  } else if (index >= listPokemons.length) {
    index = 0; // Volta para o primeiro 
  }

  currentIndex = index; 

  const pokemon = listPokemons[currentIndex];
  const details = await showPokemon(pokemon.url);

  changeText('name', details.name);
  changeImage('img_sprite_front_default', details.sprites.front_default);
}

// mostrar o Pokémon anterior
function previousPokemon() {
  updatePokemonDisplay(currentIndex - 1);
}

// mostrar o próximo Pokémon
function nextPokemon() {
  updatePokemonDisplay(currentIndex + 1);
}

document.addEventListener('DOMContentLoaded', searchPokemons);
document.getElementById('previous-button').addEventListener('click', previousPokemon);
document.getElementById('next-button').addEventListener('click', nextPokemon);