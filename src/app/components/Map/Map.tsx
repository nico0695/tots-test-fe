'use client';

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import { ICountryJSON } from '@/interfaces/countries.interfaces';

import styles from './map.module.css';

import MapControls from './components/MapControls/MapControls';
import MapPopup from './components/MapPopup/MapPopup';

interface IMapProps {
  countries: ICountryJSON[];
  countrySelected?: ICountryJSON;
}

const Map = (props: IMapProps) => {
  const { countries, countrySelected } = props;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={
          countrySelected
            ? [countrySelected.Latitude, countrySelected.Longitude]
            : [51.505, -0.09]
        }
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {countries &&
          countries.map((country, index) => (
            <Marker
              key={index}
              position={[country.Latitude, country.Longitude]}
            >
              <Popup minWidth={200}>
                <MapPopup ISOCode={country['ISO Code']} />
              </Popup>
            </Marker>
          ))}

        <MapControls countrySelected={countrySelected} />
      </MapContainer>
    </div>
  );
};

export default Map;
