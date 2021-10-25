const url = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const fetchPokemon = () => {

    const pokemonsPromisses = []

    //fazendo um loop para lançar requisição na api e pegar todos os 150 pokemons
    for (let i = 1; i <= 150; i++) {
        //metodo que faz a requisição http na url e traz os dados  e retorna a promisse convertira em json
        pokemonsPromisses.push(fetch(url(i)).then(response => response.json()))
    }

    //pegando o resultado das promisses
    Promise.all(pokemonsPromisses)
        .then(pokemons => {
            const listPokemons = pokemons.reduce((acumulator, pokemon) => {
             const tipos = pokemon.types.map(typeinfo  => typeinfo.type.name);   


                acumulator += 
                `<li class="card  ${tipos[0]}">
                <img class ="card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"/>  
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}  </h2> 
                    <p class="card-subititle">${tipos.join(' | ')} </p>
                 </li>`
                return acumulator;
            }, '')

            const ul = document.querySelector('[data-js="pokedex"]')
            ul.innerHTML = listPokemons


        })





}


fetchPokemon();