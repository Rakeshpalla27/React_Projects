import Spinner from "./Spinner";
import Message from "./Message";

import styles from "./Countrylist.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";
function Countrylist() {
  const { cities, isloading } = useCities();

  if (isloading) return <Spinner />;
  if (!cities)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default Countrylist;
