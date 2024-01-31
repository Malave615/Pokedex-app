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

    return {
        add: function (pokemon) {
            if (typeof pokemon === 'object') {
                pokemonList.push(pokemon);
            } else {
                console.log('Pokemon is not correct');
            }
        },

        getAll: function () {
            return pokemonList;
        }
    };
}());

pokemonRepository.getAll().forEach(function (pokemon) {
    "use strict";
    console.log(pokemon.name + ' is ' + pokemon.height + ' meters tall.');
    console.log(pokemon.type + ' is his type and ' + pokemon.abilities + ' are his abilities. ');
});








// for (let i = 0; i < pokemonList.length; i++) {
//   document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
//   if (pokemonList[i].height <= 1.0) {
//     document.write('<br>');
//   }
//   else {
//     document.write('That\'s a big pokemon!');
//     document.write('<br>');
//   }
// }

// function divide (dividend, divisor) {
//   if (divisor === 0) {
//     return 'You\re trying to divide by zero.'
//   } else {
//     result = dividend / divisor;
//     return result;
//   }
// }

// console.log(divide(4, 2));
// console.log(divide(7, 0));
// console.log(divide(1, 4));
// console.log(divide(12, -3));




















