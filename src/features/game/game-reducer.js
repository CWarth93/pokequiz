import { createSlice } from '@reduxjs/toolkit';
import {
  createAddToArraySetter,
  createSetter,
  createSetterWithValidation,
  createStaticSetter,
} from 'helpers/redux';
import { equals, not, pipe, prop } from 'ramda';

import { validateName } from './game-validation';

const slice = 'game';

const initialState = {
  loading: false,
  gameId: '',
  phase: 0,
  name: '',
  nameError: 'no name inserted',
  questionIndex: 0,
  questions: [],
  score: 0,
  ladder: [],
  answers: [],
};

const getGameSlice = prop(slice);
const getLoading = pipe(getGameSlice, prop('loading'));
const getGameId = pipe(getGameSlice, prop('gameId'));
const getPhase = pipe(getGameSlice, prop('phase'));
const getName = pipe(getGameSlice, prop('name'));
const getNameHasError = pipe(getGameSlice, prop('nameError'), equals(''), not);
const getQuestionIndex = pipe(getGameSlice, prop('questionIndex'));
const getQuestions = pipe(getGameSlice, prop('questions'));
const getScore = pipe(getGameSlice, prop('score'));
const getLadder = pipe(getGameSlice, prop('ladder'));
const getAnswers = pipe(getGameSlice, prop('answers'));

export const {
  actions: {
    setName,
    newGame,
    setLoading,
    setGameId,
    setQuestions,
    setPhase,
    setQuestionIndex,
    clearAnswers,
    addAnswer,
    setScore,
    setLadder,
  },
  reducer,
} = createSlice({
  initialState,
  name: slice,
  reducers: {
    setName: createSetterWithValidation('name', validateName, 'nameError'),
    newGame: createStaticSetter('phase', 0),
    setLoading: createSetter('loading'),
    setPhase: createSetter('phase'),
    setGameId: createSetter('gameId'),
    setQuestions: createSetter('questions'),
    setQuestionIndex: createSetter('questionIndex'),
    clearAnswers: createStaticSetter('answers', []),
    addAnswer: createAddToArraySetter('answers'),
    setScore: createSetter('score'),
    setLadder: createSetter('ladder'),
  },
});

export {
  getLoading,
  getGameId,
  getPhase,
  getName,
  getNameHasError,
  getQuestionIndex,
  getQuestions,
  getScore,
  getLadder,
  getAnswers,
  slice,
};
