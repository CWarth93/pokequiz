import { describe } from 'riteway';

import {
  addAnswer,
  clearAnswers,
  getAnswers,
  getGameId,
  getLadder,
  getLoading,
  getName,
  getNameHasError,
  getPhase,
  getQuestionIndex,
  getQuestions,
  getScore,
  newGame,
  reducer,
  setGameId,
  setLadder,
  setLoading,
  setName,
  setPhase,
  setQuestionIndex,
  setQuestions,
  setScore,
  slice,
} from './game-reducer';

const createState = ({
  loading = false,
  gameId = '',
  phase = 0,
  name = '',
  nameError = 'no name inserted',
  questionIndex = 0,
  questions = [],
  score = 0,
  ladder = [],
  answers = [],
} = {}) => ({
  loading,
  gameId,
  phase,
  name,
  nameError,
  questionIndex,
  questions,
  score,
  ladder,
  answers,
});

const createRootState = state => ({ [slice]: state });

const state = createState();

describe('features.game.game-reducer', async assert => {
  {
    assert({
      given: 'given no intial state and no action',
      should: 'return a valid intial state',
      actual: reducer(undefined, {}),
      expected: state,
    });
  }

  {
    assert({
      given: 'given an intial state and a getLoading selector',
      should: 'should return false',
      actual: getLoading(createRootState(state)),
      expected: false,
    });

    assert({
      given: 'given an intial state and a getGameId selector',
      should: 'should return empty string',
      actual: getGameId(createRootState(state)),
      expected: '',
    });

    assert({
      given: 'given an intial state and a getPhase selector',
      should: 'should return 0',
      actual: getPhase(createRootState(state)),
      expected: 0,
    });

    assert({
      given: 'given an intial state and a getName selector',
      should: 'should return empty string',
      actual: getName(createRootState(state)),
      expected: '',
    });

    assert({
      given: 'given an intial state and a getNameHasError selector',
      should: 'should return true',
      actual: getNameHasError(createRootState(state)),
      expected: true,
    });

    assert({
      given: 'given an intial state and a getQuestionIndex selector',
      should: 'should return 0',
      actual: getQuestionIndex(createRootState(state)),
      expected: 0,
    });

    assert({
      given: 'given an intial state and a getQuestions selector',
      should: 'should return empty array',
      actual: getQuestions(createRootState(state)),
      expected: [],
    });

    assert({
      given: 'given an intial state and a getScore selector',
      should: 'should return 0',
      actual: getScore(createRootState(state)),
      expected: 0,
    });

    assert({
      given: 'given an intial state and a getLadder selector',
      should: 'should return empty array',
      actual: getLadder(createRootState(state)),
      expected: [],
    });

    assert({
      given: 'given an intial state and a getAnswers selector',
      should: 'should return empty array',
      actual: getAnswers(createRootState(state)),
      expected: [],
    });
  }

  {
    assert({
      given: 'given an initial state and a setName action',
      should: 'should return an updated name and name error',
      actual: reducer(undefined, setName('test')),
      expected: createState({
        name: 'test',
        nameError: 'The name must contain at least 5 letters.',
      }),
    });

    assert({
      given: 'given an initial state and a newGame action',
      should: 'should return an updated phase',
      actual: reducer(undefined, newGame),
      expected: createState({ phase: 0 }),
    });

    assert({
      given: 'given an initial state and a setLoading action',
      should: 'should return an updated loading',
      actual: reducer(undefined, setLoading(true)),
      expected: createState({ loading: true }),
    });

    assert({
      given: 'given an initial state and a setPhase action',
      should: 'should return an updated phase',
      actual: reducer(undefined, setPhase(2)),
      expected: createState({ phase: 2 }),
    });

    assert({
      given: 'given an initial state and a setGameId action',
      should: 'should return an updated gameId',
      actual: reducer(undefined, setGameId('test')),
      expected: createState({ gameId: 'test' }),
    });

    assert({
      given: 'given an initial state and a setQuestions action',
      should: 'should return updated questions',
      actual: reducer(undefined, setQuestions(['hi'])),
      expected: createState({ questions: ['hi'] }),
    });

    assert({
      given: 'given an initial state and a setQuestionIndex action',
      should: 'should return an updated questionIndex',
      actual: reducer(undefined, setQuestionIndex(3)),
      expected: createState({ questionIndex: 3 }),
    });

    assert({
      given: 'given an initial state and a clearAnswers action',
      should: 'should return empty answers',
      actual: reducer(undefined, clearAnswers),
      expected: createState({ answers: [] }),
    });

    assert({
      given: 'given an initial state and a addAnswer action',
      should: 'should return answers with new one',
      actual: reducer(undefined, addAnswer('hi')),
      expected: createState({ answers: ['hi'] }),
    });

    assert({
      given: 'given an initial state and a setScore action',
      should: 'should return an updated score',
      actual: reducer(undefined, setScore(3)),
      expected: createState({ score: 3 }),
    });

    assert({
      given: 'given an initial state and a setLadder action',
      should: 'should return updated ladder',
      actual: reducer(undefined, setLadder(['hi'])),
      expected: createState({ ladder: ['hi'] }),
    });
  }
});
