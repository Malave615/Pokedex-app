const pokemonList = [
  {
    name: 'Pikachu',
    height: 0.4, // changed to a number
    type: ['electric'], // changed to an array
    abilities: ['static', 'lightningrod']
  },
  {
    name: 'Jigglypuff',
    height: 0.5,
    type: ['fairy', 'normal'], // kept as an array
    abilities: ['cute-charm', 'friend-guard']
  },
  {
    name: 'Mewtwo',
    height: 2,
    type: ['psychic'],
    abilities: ['pressure', 'unnerve']
  },
  {
    name: 'Squirtle',
    height: 0.5,
    type: ['water'], // fixed the typo
    abilities: ['torrent']
  }
];

for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');
  if (pokemonList[i].height <= 1.0) {
    document.write('<br>');
  }
  else {
    document.write('That\'s a big pokemon!');
    document.write('<br>');
  }
}

function divide (dividend, divisor) {
  if (divisor === 0) {
    return 'You\re trying to divide by zero.'
  } 
  else {
    result = dividend / divisor;
    return result;
  }
}

console.log(divide(4, 2));
console.log(divide(7, 0));
console.log(divide(1, 4));
console.log(divide(12, -3));




