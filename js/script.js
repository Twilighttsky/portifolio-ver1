const pokemonName = document.querySelector('.pokemon_name');

const pokemonNumber = document.querySelector('.pokemon_number');

const pokemonImage = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');

const input = document.querySelector('input');

const prev = document.querySelector('.btn-prev');

const next = document.querySelector('.btn-next');

let searchPokemon = 0

// Conectando a Poke-Api
    async function fetchPokemon(pokemon) {
        const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);


        if (apiResponse.status === 200) {
            const data = await apiResponse.json();
            return data;
        } else {
            alert('Não foi possivel estabelecer uma conexão com a API');
        }

    }


//renderizar pokemon
const renderPokemon = async (pokemon) =>{
    pokemonName.innerHTML='carregando';
    pokemonNumber.innerHTML='';

    const data = await fetchPokemon(pokemon);
    console.log(data);

    if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id
    }

    else {
       pokemonName.innerHTML = 'Inexistente'
       pokemonImage.src = '../img/unamed.png';
    }
}


//achar pokemon por input
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

prev.addEventListener("click",()=>{
   
    if(searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }

})

next.addEventListener('click', ()=>{
    searchPokemon += 1
    renderPokemon(searchPokemon)
})
