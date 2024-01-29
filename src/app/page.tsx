'use client';

import { useMemo, useState } from 'react';

import dynamic from 'next/dynamic';

import { getCountriesList } from '@/api/countries';
import { ICountryJSON } from '@/interfaces/countries.interfaces';

import LoaderSpinner from './components/LoaderSpinner/LoaderSpinner';
import styles from './page.module.css';

export default function Home() {
  const countries = getCountriesList();

  const [countrySelected, setCountrySelected] = useState<ICountryJSON>(
    countries?.[0] ?? undefined
  );

  // Load the map component
  const Map = useMemo(
    () =>
      dynamic(() => import('./components/Map/Map'), {
        loading: () => (
          <div className={styles.mapLoading}>
            <LoaderSpinner />
          </div>
        ),
        ssr: false,
      }),
    []
  );

  const handleSelectCountry = (country: ICountryJSON) => {
    setCountrySelected(country);
  };

  return (
    <main className={styles.main}>
      <h1>TOTS - Test FE</h1>

      <div className={styles.container}>
        {/* Marker List */}
        <div className={styles.list}>
          <div className={styles.listHeader}>
            <h4>Countries</h4>
          </div>

          {countries.map((country) => (
            <div
              key={country.Country}
              className={`${styles.listItem} ${
                countrySelected?.Country === country.Country
                  ? styles.listItemSelected
                  : ''
              }`}
              onClick={() => handleSelectCountry(country)}
            >
              <p>{country.Country}</p>
              <p>{`ISO: ${country['ISO Code']}`}</p>
            </div>
          ))}
        </div>

        {/* Map */}
        <Map countries={countries} countrySelected={countrySelected} />
      </div>
    </main>
  );
}
