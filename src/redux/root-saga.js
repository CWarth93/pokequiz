import { watchAnswer, watchStartGame } from 'features/game/game-saga';
import { all } from 'redux-saga/effects';

function* rootSaga() {
  yield all([watchStartGame(), watchAnswer()]);
}

export { rootSaga };
