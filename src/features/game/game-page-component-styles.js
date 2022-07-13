import styled from 'styled-components';
import { gray, green, pink } from 'styles/colors.js';

const RootContainer = styled.main`
  background: radial-gradient(
    circle,
    rgba(221, 126, 218, 1) 0%,
    rgba(148, 233, 232, 1) 86%
  );
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  height: content;
  width: 100%;
`;

const HeadingContainer = styled.h1`
  height: 10vh;
  min-height: 60px;
  display: flex;
  flex-direction: row;
`;

const HeadingFirst = styled.p`
  font-family: 'Pokemon';
  font-size: 54px;
  color: ${green};
  align-self: center;
`;

const HeadingSecond = styled.p`
  font-family: 'Pokemon';
  font-size: 54px;
  color: ${pink};
  align-self: center;
`;

const ContentContainer = styled.div`
  height: 80vh;
  min-height: 580px;
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const LoadingPicture = styled.img`
  height: 20vh;
  min-height: 180px;
  width: auto;
  align-self: center;
`;

const StartPicture = styled.img`
  height: 20vh;
  min-height: 180px;
  align-self: center;
`;

const StartInputContainer = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const NameInput = styled.input`
  width: 180px;
  padding: 10px;
  border: ${props =>
    props.hasError ? '1px solid ' + pink : '1px solid ' + gray};
`;

const StartButton = styled.button`
  width: 160px;
  background-color: ${green};
  margin-left: 20px;
  font-family: 'Pokemon';
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  padding: 0px;
  border: ${props =>
    props.disabled ? '1px solid ' + gray : '1px solid ' + pink};
`;

const QuestionText = styled.p`
  font-family: 'Pokemon';
  font-size: 20px;
  align-self: center;
`;

const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-self: center;
`;

const PokemonOption = styled.img`
  height: 15vh;
  min-height: 140px;
  min-width: 140px;
`;

const TimerContainer = styled.div`
  margin-top: 20px;
  align-self: center;
  font-family: 'Pokemon';
  font-size: 18px;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-family: 'Pokemon';
  font-size: 16px;
  align-self: center;
`;

const ScoreText = styled.div`
  font-family: 'Pokemon';
  font-size: 20px;
  align-self: center;
`;

const LadderLabel = styled.h2`
  font-family: 'Pokemon';
  align-self: center;
`;

const LadderList = styled.ol`
  margin-top: 20px;
  align-self: center;
  list-style-type: decimal;
`;

const LadderEntry = styled.li`
  font-family: 'Pokemon';
  font-size: 14px;
  margin-left: -8px;
  margin-bottom: 5px;
`;

const FinishButton = styled.button`
  margin-top: 30px;
  width: 160px;
  background-color: ${green};
  font-family: 'Pokemon';
  font-size: 16px;
  cursor: pointer;
  text-transform: uppercase;
  padding: 0px;
  align-self: center;
  margin-bottom: 20px;
`;

const BottomBar = styled.div`
  height: 3vh;
  width: 90vw;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ImprintLink = styled.a`
  font-size: 16px;
  margin-right: 20px;
`;

export {
  RootContainer,
  HeadingContainer,
  HeadingFirst,
  HeadingSecond,
  ContentContainer,
  LoadingPicture,
  StartPicture,
  StartInputContainer,
  NameInput,
  StartButton,
  QuestionText,
  OptionsContainer,
  PokemonOption,
  TimerContainer,
  LoadingText,
  ScoreText,
  LadderLabel,
  LadderList,
  LadderEntry,
  FinishButton,
  BottomBar,
  ImprintLink,
};
