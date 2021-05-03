const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
var list = []
const setList = pokemon => this.list.push(pokemon);
const generatePokemonPromises = (param) =>Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))
    
const generateHTML = pokemons => pokemons.reduce((accumulator, pokemon) => {
    const elementTypes = pokemon.types.map(typeInfo => typeInfo.type.name)
    
    accumulator +=`
    <button class="btn btn-outline-secondary" type="button" id="${pokemon.id}">
        <li class="card ${elementTypes[0]}" id="${pokemon.id}">
            <img class="card-image" alt="${pokemon.name}" src="${pokemon.sprites.front_default}"/>
            <h2 class="card-title">${pokemon.id} - ${pokemon.name}<h2>
            <p class="card-subtitle">${elementTypes.join( ' | ')}</p>
        </li>
    </button>
    `
    setList(pokemon)
    return accumulator
}, '')

const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
    return generatePokemonPromises();
}

const text = id => {
    let pokemon = this.list[id];
    let stats = "";
    pokemon.stats.forEach(el => {
        stats += `<label href="#" class="list-group-item list-group-item-action d-flex align-items-center">
        <span class="stats">${el.stat.name.replace('-',' ')}: ${el.base_stat}</span>
        </label>`
    });
    let moves = ""
    pokemon.moves.forEach(el => {
        moves += `<label href="#" class="list-group-item list-group-item-action d-flex align-items-center">
        <span class="stats">${el.move.name.replace('-',' ')}</span>
        </label>`
    });
    stats = `<h2>Stats:</h1>${stats}`    
    moves = `<h2>Moves:</h1>${moves}`    
    const html = `<div>
    ${stats}
    ${moves}
    </div>
    `                  
    let text = {
        name : pokemon.name,
        html,
    }  
    return text
}
const pokemonPromises = generatePokemonPromises()


Promise.all(pokemonPromises).then(generateHTML).then(insertPokemonIntoPage).then(test =>{
        const poke = {
            $container: $('.container'),
            $info: $('.info'),
            $pokemon: $('.pokemon'),
    
            init: function() {
                    
                this.$container.on("click",".btn", (e) => {
                    const message = text(e.target.offsetParent.id -1)
                    console.log(message)
                    this.$info.text(message.name)
                    this.$pokemon.find('div').remove();
                    let $selected = $(message.html);
                    this.$pokemon.append($selected);
                    
                })
            }
        }
    
        poke.init()
    })

