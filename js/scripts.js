const pokemonRepository = (function () {
    "use strict";
    const pokemonList = [
        {
            name: 'Pikachu',
            height: 0.4, // changed to a number
            type: ['Electric'], // changed to an array
            abilities: ['Static', 'Lightningrod']
        },
        {
            name: 'Jigglypuff',
            height: 0.5,
            type: ['Fairy', 'Normal'], // kept as an array
            abilities: ['Cute-charm', 'Friend-guard']
        },
        {
            name: 'Mewtwo',
            height: 2,
            type: ['Psychic'],
            abilities: ['Pressure', 'Unnerve']
        },
        {
            name: 'Squirtle',
            height: 0.5,
            type: ['Water'], // fixed the typo
            abilities: ['Torrent']
        }
    ];

    function add(pokemon) {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        } else {
            console.log('Pokemon is not correct');
        }
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let ulItem = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');

        listItem.appendChild(button);
        ulItem.appendChild(listItem);

        button.addEventListener('click', function () {
            console.log(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails
    };
}());

pokemonRepository.getAll().forEach(function (pokemon) {
    "use strict";
    pokemonRepository.addListItem(pokemon);
});