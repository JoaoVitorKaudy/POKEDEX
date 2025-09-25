
const pokemonName = document.querySelector('.pokemon_name'); 
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonTypeContainer = document.querySelector('.pokemon_data_type');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const button_prev = document.querySelector('.btn_prev');
const button_next = document.querySelector('.btn_next');
const button_shiny = document.querySelector('.btn_shiny');

const typeColors = {
    grass: '#74CB48', fire: '#F57D31', water: '#6493EB', bug: '#A7B723',
    normal: '#AAA67F', poison: '#A43E9E', electric: '#F9CF30', ground: '#DEC16B',
    fairy: '#E69EAC', fighting: '#C12239', psychic: '#FB5584', rock: '#B69E31',
    ghost: '#70559B', ice: '#9AD6DF', dragon: '#7037FF', dark: '#75574C',
    steel: '#B7B9D0', flying: '#A891EC'
};

let searchPokemon = 1;
let isShiny = false;
let normalSprite = '';
let shinySprite = '';

const fetchPokemon = async (pokemon) => {
    const APIReponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIReponse.status === 200) {
        const data = await APIReponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';
    pokemonTypeContainer.innerHTML = '';
    pokemonImage.style.display = 'none';

    isShiny = false;
    button_shiny.innerHTML = 'SHINY';
    button_shiny.style.backgroundColor = '#fff134ff';
    button_shiny.style.color = '#000';
    button_shiny.disabled = true;

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        input.value = '';
        searchPokemon = data.id;

        normalSprite = data['sprites']['other']['official-artwork']['front_default'];
        shinySprite =  data['sprites']['other']['official-artwork']['front_shiny'];
        
        pokemonImage.src = normalSprite;

        if (shinySprite) {
            button_shiny.disabled = false;
        }

        const types = data.types.map(typeInfo => typeInfo.type.name);
        const typeSpans = types.map(type => 
            `<span class="pokemon_type" style="background-color: ${typeColors[type]}">${type}</span>`
        ).join('');
        pokemonTypeContainer.innerHTML = typeSpans;

    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

button_prev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

button_next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

button_shiny.addEventListener('click', () => {
    isShiny = !isShiny;

    if (isShiny) {
        pokemonImage.src = shinySprite;
        button_shiny.innerHTML = 'NORMAL';
        button_shiny.style.backgroundColor = '#fff134ff';
        button_shiny.style.color = '#000';
    } else {
        pokemonImage.src = normalSprite;
        button_shiny.innerHTML = 'SHINY';
    }
});

renderPokemon(searchPokemon);