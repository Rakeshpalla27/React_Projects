export function Error({ err }) {
  return (
    <p className="error">
      <span>❌</span>
      {err}
    </p>
  );
}
