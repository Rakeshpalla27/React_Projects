import { createContext, useContext, useEffect, useReducer } from "react";
const url = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isloading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isloading: true };

    case "cities/loaded":
      return {
        ...state,
        isloading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isloading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isloading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isloading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isloading: false,
        error: action.payload,
      };

    default:
      throw new Error("unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isloading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setcities] = useState([]);
  // const [isloading, setisloading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    dispatch({ type: "loading" });
    try {
      fetch(`${url}/cities`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: "cities/loaded", payload: data }));
    } catch {
      dispatch({
        type: "rejected",
        payload: "something went wrong while fetching cities",
      });
    }
  }, []);

  function getCity(id) {
    if (Number(id) === currentCity.id) return;
    try {
      fetch(`${url}/cities/${id}`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: "city/loaded", payload: data }));
    } catch {
      dispatch({
        type: "rejected",
        payload: "something went wrong while loading the city ",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${url}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "something went wrong while creating  the city ",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${url}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "something went wrong while deleting the city ",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        isloading,
        cities,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("context is used outside the contextProvider");

  return context;
}

export { CitiesProvider, useCities };
