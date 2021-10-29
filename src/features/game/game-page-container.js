import {
  createButtonHandler,
  createSelectionHandler,
  createTextFieldSetter,
} from 'helpers/redux';
import React from 'react';
import { connect } from 'react-redux';

import Component from './game-page-component.js';
import {
  getLadder,
  getLoading,
  getName,
  getNameHasError,
  getPhase,
  getQuestionIndex,
  getQuestions,
  getScore,
  newGame,
  setName,
} from './game-reducer.js';
import { answer, startGame } from './game-saga';

const mapStateToProps = state => ({
  loading: getLoading(state),
  phase: getPhase(state),
  name: getName(state),
  nameHasError: getNameHasError(state),
  questionIndex: getQuestionIndex(state),
  questions: getQuestions(state),
  score: getScore(state),
  ladder: getLadder(state),
});

const mapDispatchToProps = {
  onClickStart: createButtonHandler(startGame),
  onChangeName: createTextFieldSetter(setName),
  onClickAnswer: createSelectionHandler(answer),
  onClickFinish: createButtonHandler(newGame),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const Container = ({ ...rest }) => <Component {...rest} />;

export default connector(Container);
