const superheroes = require('superheroes');
const supervillains = require('supervillains');

console.log(superheroes.random());
console.log(supervillains.random());

let supervillainsAsSet = new Set(supervillains.all);
let heroesAndVillains = superheroes.all.filter(sh => supervillainsAsSet.has(sh));
console.log(heroesAndVillains);