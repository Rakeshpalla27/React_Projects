function Progress({ index, numques, points, maxpoints, answer }) {
  return (
    <header className="progress">
      <progress max={numques} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numques}
      </p>
      <p>
        <strong>
          {points}/{maxpoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
