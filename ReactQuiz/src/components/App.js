import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Question from "./Question";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timmer from "./Timmer";
import Footer from "./Footer";
const sec_per_que = 30;
const initialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsremaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "datareceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "datafailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsremaining: state.questions.length * sec_per_que,
      };
    case "newanswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextquestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialstate,
        questions: state.questions,

        status: "ready",
      };
    case "tick":
      return {
        ...state,
        status: state.secondsremaining === 0 ? "finished" : state.status,
        secondsremaining: state.secondsremaining - 1,
      };
    default:
      throw new Error("unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsremaining,
  } = state;
  const numques = questions.length;
  const maxpoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "datareceived", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numques={numques} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numques={numques}
              index={index}
              points={points}
              maxpoints={maxpoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timmer
                dispatch={dispatch}
                secondsremaining={secondsremaining}
              ></Timmer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numques={numques}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxpoints={maxpoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
