import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlpostion } from "../hooks/useUrlposition";
function Map() {
  const { cities } = useCities();
  const [mapPosition, setmapPostion] = useState([16, 80]);
  const {
    isLoading: isLoadingpostion,
    position: geolocationposition,
    getPosition,
  } = useGeolocation();

  const [maplat, maplng] = useUrlpostion();
  useEffect(
    function () {
      if (maplat && maplng) setmapPostion([maplat, maplng]);
    },
    [maplat, maplng]
  );

  useEffect(
    function () {
      if (geolocationposition)
        setmapPostion([geolocationposition.lat, geolocationposition.lng]);
    },
    [geolocationposition]
  );
  return (
    <div className={styles.mapContainer}>
      {!geolocationposition && (
        <Button type="position" onclick={getPosition}>
          {isLoadingpostion ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        // center={[maplat, maplng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <Changecenter position={mapPosition} />
        <Detectclick />
      </MapContainer>
    </div>
  );
}

function Changecenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function Detectclick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
