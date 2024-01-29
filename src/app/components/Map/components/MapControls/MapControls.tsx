'use client';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

import { ICountryJSON } from '@/interfaces/countries.interfaces';

interface IMapControlsProps {
  countrySelected?: ICountryJSON;
}

// This component is used to control the map view when a country is selected
const MapControls = (props: IMapControlsProps) => {
  const { countrySelected } = props;

  const map = useMap();

  useEffect(() => {
    if (countrySelected) {
      map.setView([countrySelected.Latitude, countrySelected.Longitude]);
    }
  }, [countrySelected, map]);

  return null;
};

export default MapControls;
