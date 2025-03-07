function FinishScreen({ points, maxpoints, highscore, dispatch }) {
  const percentage = (points / maxpoints) * 100;
  let emoji;
  if (percentage === 0) emoji = "🥲";
  if (percentage >= 70) emoji = "🥳";
  if (percentage <= 70 && percentage > 0) emoji = "😃";
  if (percentage === 100) emoji = "😍";

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxpoints} ({emoji}
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore : {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
