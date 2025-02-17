export default function Searchmsg({ query }) {
  return (
    <div>{!query.length && <p className="error">Search for Movies...</p>}</div>
  );
}
