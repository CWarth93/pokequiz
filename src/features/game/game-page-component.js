import React from 'react';
import Timer from 'react-compound-timer';

import {
  BottomBar,
  ContentContainer,
  FinishButton,
  HeadingContainer,
  HeadingFirst,
  HeadingSecond,
  ImprintLink,
  LadderEntry,
  LadderLabel,
  LadderList,
  LoadingPicture,
  LoadingText,
  NameInput,
  OptionsContainer,
  PokemonOption,
  QuestionText,
  RootContainer,
  ScoreText,
  StartButton,
  StartInputContainer,
  StartPicture,
  TimerContainer,
} from './game-page-component-styles.js';

const Component = ({
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
}) => (
  <RootContainer id="root-container">
    <HeadingContainer id="heading-container">
      <HeadingFirst id="heading-first">{texts['heading-first']}</HeadingFirst>
      <HeadingSecond id="heading-second">
        {texts['heading-second']}
      </HeadingSecond>
    </HeadingContainer>

    {loading && (
      <ContentContainer id="content-container-loading">
        <LoadingPicture id="loading-picture" src="/images/loading.gif" />
        <LoadingText>{texts['loading-text']}</LoadingText>
      </ContentContainer>
    )}

    {!loading && (
      <>
        {phase === 0 && (
          <ContentContainer id="content-container-start">
            <StartPicture id="start-picture" src="/images/start.gif" />
            <StartInputContainer id="start-input-container">
              <NameInput
                id="name-input"
                placeholder={texts['name-input-label']}
                value={name}
                onChange={onChangeName}
                hasError={nameHasError}
              />
              <StartButton
                id="start-button"
                disabled={nameHasError}
                onClick={onClickStart}
              >
                {texts['start-button-label']}
              </StartButton>
            </StartInputContainer>
          </ContentContainer>
        )}

        {phase === 1 && (
          <ContentContainer id="content-container-quiz">
            <QuestionText id="question-text">
              {texts['question-count-pre']} {questionIndex + 1}:{' '}
              {questions[questionIndex].text}
            </QuestionText>

            <Timer
              id="timer"
              checkpoints={[
                { time: 0, callback: () => onClickAnswer({ option: -1 }) },
              ]}
              initialTime={15000}
              direction="backward"
            >
              {({ reset }) => (
                <>
                  <OptionsContainer>
                    {questions[questionIndex].options.map(option => (
                      <PokemonOption
                        className="pokemon"
                        id={'pokemon-' + option}
                        key={'pokemon-' + option}
                        src={'/images/pokemon/' + option + '.png'}
                        onClick={() => {
                          onClickAnswer({ option });
                          reset();
                        }}
                      />
                    ))}
                  </OptionsContainer>

                  <TimerContainer>
                    <Timer.Seconds id="timer-seconds" />
                  </TimerContainer>
                </>
              )}
            </Timer>
          </ContentContainer>
        )}

        {phase === 2 && (
          <ContentContainer id="content-container-results">
            <ScoreText id="score-text">
              {texts['score-pre']} {score}
            </ScoreText>
            <LadderLabel id="ladder-label">{texts['ladder-label']}</LadderLabel>
            <LadderList id="ladder-list">
              {ladder.map(result => (
                <LadderEntry
                  id={'ladder-entry-' + result.name}
                  key={'ladder-entry-' + result.name}
                >
                  {result.name} ({result.score})
                </LadderEntry>
              ))}
            </LadderList>
            <FinishButton id="finish-button" onClick={onClickFinish}>
              {texts['finish-button-label']}
            </FinishButton>
          </ContentContainer>
        )}
      </>
    )}

    <BottomBar id="bottom-bar">
      <ImprintLink id="imprint-link" href="/imprint">
        {texts['imprint-link']}
      </ImprintLink>
    </BottomBar>
  </RootContainer>
);

export default Component;
