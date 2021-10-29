import { sendRequest } from 'helpers/http';
import { detect } from 'helpers/language';
import { defaultLanguage, getTexts, supportedLanguages } from 'locales';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import {
  addAnswer,
  clearAnswers,
  getAnswers,
  getGameId,
  getName,
  getQuestionIndex,
  getQuestions,
  setGameId,
  setLadder,
  setLoading,
  setPhase,
  setQuestionIndex,
  setQuestions,
  setScore,
} from './game-reducer';

const startGame = payload => ({ type: startGame.type, payload });
startGame.type = 'GAME/startGame';

function* handleStartGame() {
  yield put(setLoading(true));
  try {
    const name = yield select(getName);
    const language = detect(supportedLanguages, defaultLanguage);
    const res = yield call(sendRequest, {
      method: 'POST',
      url: window.location.origin + '/api/game/start',
      body: { name, language },
      headers: { 'Content-Type': 'application/json' },
    });
    const { gameId, questions } = res;
    yield put(setGameId(gameId));
    yield put(setQuestions(questions));
    yield put(setQuestionIndex(0));
    yield put(setPhase(1));
    yield put(setLoading(false));
  } catch (e) {
    console.error(e);
    alert(getTexts()['game-start-error']);
    yield put(setLoading(false));
  }
}

function* watchStartGame() {
  yield takeEvery(startGame.type, handleStartGame);
}

const answer = payload => ({ type: answer.type, payload });
answer.type = 'GAME/answer';

function* handleAnswer({ payload: { option } }) {
  yield put(setLoading(true));
  try {
    yield put(addAnswer(option));
    const questions = yield select(getQuestions);
    const questionIndex = yield select(getQuestionIndex);
    if (questionIndex === questions.length - 1) {
      const gameId = yield select(getGameId);
      const answers = yield select(getAnswers);
      const res = yield call(sendRequest, {
        method: 'POST',
        url: window.location.origin + '/api/game/finish',
        body: { gameId, answers },
        headers: { 'Content-Type': 'application/json' },
      });
      const { score, ladder } = res;
      yield put(setScore(score));
      yield put(setLadder(ladder));
      yield put(clearAnswers());
      yield put(setPhase(2));
      yield put(setLoading(false));
    } else {
      yield put(setQuestionIndex(questionIndex + 1));
      yield put(setLoading(false));
    }
  } catch (e) {
    console.error(e);
    alert(getTexts()['game-end-error']);
    yield put(setLoading(false));
  }
}

function* watchAnswer() {
  yield takeEvery(answer.type, handleAnswer);
}

export {
  startGame,
  handleStartGame,
  watchStartGame,
  answer,
  handleAnswer,
  watchAnswer,
};
