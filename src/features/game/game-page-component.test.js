import { describe } from 'riteway';
import render from 'riteway/render-component.js';

import Component from './game-page-component';

describe('features.game.game-page-component', async assert => {
  const createProps = ({
    texts = {
      'heading-first': 'Poke',
      'heading-second': 'QUIZ',
      'name-input-label': 'Player name',
      'start-button-label': 'Start',
      'question-count-pre': 'Question ',
      'score-pre': 'Your score is ',
      'ladder-label': 'Highscore:',
      'finish-button-label': 'Finish',
      'name-error': 'The name must contain at least 5 letters.',
      'game-start-error': 'Could not start the game.',
      'game-end-error': 'Could not finish the game.',
      'imprint-link': 'Imprint',
      'loading-text': 'Loading...',
    },
    loading = false,
    phase = 0,
    name = '',
    nameHasError = false,
    questionIndex = 0,
    questions = [
      { text: 'Which is a water pokemon?', options: [2, 4, 5, 1, 32, 21] },
      { text: 'Which is a fire pokemon?', options: [101, 87, 1, 44, 17, 6] },
      { text: 'Which is a plant pokemon?', options: [13, 25, 21, 38, 187, 5] },
    ],
    score = 0,
    ladder = [
      { name: 'Eich', score: 15 },
      { name: 'Ash', score: 14 },
      { name: 'Ash', score: 14 },
      { name: 'Ash', score: 14 },
      { name: 'Ash', score: 13 },
      { name: 'Ash', score: 13 },
      { name: 'Ash', score: 12 },
      { name: 'Rocko', score: 12 },
      { name: 'Misty', score: 11 },
      { name: 'Misty', score: 11 },
    ],
    onClickStart = () => true,
    onChangeName = () => true,
    onClickAnswer = () => true,
    onClickFinish = () => true,
  } = {}) => ({
    texts,
    loading,
    phase,
    name,
    nameHasError,
    questionIndex,
    questions,
    score,
    ladder,
    onClickStart,
    onChangeName,
    onClickAnswer,
    onClickFinish,
  });

  const createGame = (props = createProps()) =>
    render(<Component {...props} />);

  {
    const props = createProps();
    const $ = createGame(props);

    assert({
      given: 'game component with default props',
      should: 'display the start container',
      actual: $('#content-container-start').length,
      expected: 1,
    });

    assert({
      given: 'game component with default props',
      should: 'display the name input',
      actual: $('#name-input').length,
      expected: 1,
    });

    assert({
      given: 'game component with default props',
      should: 'display the start button',
      actual: $('#start-button').length,
      expected: 1,
    });
  }

  {
    const props = createProps({ loading: true });
    const $ = createGame(props);

    assert({
      given: 'game component in loading state',
      should: 'display the loading container',
      actual: $('#content-container-loading').length,
      expected: 1,
    });

    assert({
      given: 'game component in loading state',
      should: 'not display the start container',
      actual: $('#content-container-start').length,
      expected: 0,
    });
  }

  {
    const props = createProps({ name: 'Ralf1994' });
    const $ = createGame(props);

    assert({
      given: 'game component with valid name input',
      should: 'enable the start button',
      actual: $('#start-button')[0].attribs.disabled,
      expected: undefined,
    });
  }

  {
    const props = createProps({ nameHasError: true });
    const $ = createGame(props);

    assert({
      given: 'game component with name error',
      should: 'disable the start button',
      actual: $('#start-button')[0].attribs.disabled,
      expected: '',
    });
  }

  {
    const props = createProps({ phase: 1 });
    const $ = createGame(props);

    assert({
      given: 'game component in quiz phase',
      should: 'display the quiz container',
      actual: $('#content-container-quiz').length,
      expected: 1,
    });

    assert({
      given: 'game component in quiz phase',
      should: 'display the question text',
      actual: $('#question-text').length,
      expected: 1,
    });
  }

  {
    const props = createProps({ phase: 2 });
    const $ = createGame(props);

    assert({
      given: 'game component in end phase',
      should: 'display the results container',
      actual: $('#content-container-results').length,
      expected: 1,
    });

    assert({
      given: 'game component in end phase',
      should: 'display the score text',
      actual: $('#score-text').length,
      expected: 1,
    });

    assert({
      given: 'game component in end phase',
      should: 'display the ladder label',
      actual: $('#ladder-label').length,
      expected: 1,
    });

    assert({
      given: 'game component in end phase',
      should: 'display the ladder list',
      actual: $('#ladder-list').length,
      expected: 1,
    });
  }
});
