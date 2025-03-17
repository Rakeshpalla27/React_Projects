import Spinner from "./Spinner";
import Message from "./Message";

import styles from "./Citylist.module.css";
import Cityitem from "./Cityitem";
import { useCities } from "../contexts/CitiesContext";

function Citylist() {
  const { cities, isloading } = useCities();
  if (isloading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <Cityitem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default Citylist;
