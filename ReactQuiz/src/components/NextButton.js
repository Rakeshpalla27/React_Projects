function NextButton({ dispatch, answer, index, numques }) {
  if (answer === null) return null;
  if (index < numques - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextquestion" })}
      >
        Next
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
