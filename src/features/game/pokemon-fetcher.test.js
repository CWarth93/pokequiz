import { maximum } from 'helpers/statistic';
import { describe } from 'riteway';

import { getRandomPokemons } from './pokemon-fetcher';

describe('features.game.pokemon-fetcher', async assert => {
  const pokemons = await getRandomPokemons(5, 150);

  assert({
    given: 'given an amount and a maximum id',
    should: 'return the correct amount of pokemons',
    actual: pokemons.length,
    expected: 5,
  });

  assert({
    given: 'given an amount and a maximum id',
    should: 'return no pokemon with an higher id',
    actual: maximum(pokemons.map(pokemon => pokemon.id)) < 150,
    expected: true,
  });
});
