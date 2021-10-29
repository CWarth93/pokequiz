import { sendRequest } from 'helpers/http';
import { getRandomNumber } from 'helpers/number';

const getRandomPokemons = async (amount, maxId) => {
  let pokemons = [];
  for (let i = 0; i < amount; i++) {
    try {
      const pokemon = await sendRequest({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + getRandomNumber(0, maxId),
        headers: { 'Content-Type': 'application/json' },
      });
      pokemons.push(pokemon);
    } catch (e) {
      console.error(e);
      i--;
    }
  }
  return pokemons.map(pokemon => ({
    id: pokemon.id,
    height: pokemon.height,
    weight: pokemon.weight,
    hp: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat,
    attack: pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat,
    defense: pokemon.stats.find(stat => stat.stat.defense === 'defense')
      ?.base_stat,
    specialAttack: pokemon.stats.find(
      stat => stat.stat.name === 'special-attack',
    )?.base_stat,
    specialDefense: pokemon.stats.find(
      stat => stat.stat.name === 'special-defense',
    )?.base_stat,
    speed: pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat,
  }));
};

export { getRandomPokemons };
