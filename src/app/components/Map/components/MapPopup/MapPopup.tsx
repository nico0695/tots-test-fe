import React, { useEffect, useState } from 'react';

import { getCountryByCode } from '@/api/countries';
import { ICountry } from '@/interfaces/countries.interfaces';

import LoaderSpinner from '@/app/components/LoaderSpinner/LoaderSpinner';

import styles from './mapPopup.module.css';

interface IMapPopupProps {
  ISOCode: string;
}

const MapPopup = (props: IMapPopupProps) => {
  const { ISOCode } = props;

  const [country, setCountry] = useState<ICountry>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountryInfo = async (code: string) => {
    setIsLoading(true);
    const country = await getCountryByCode(code);

    if (country) {
      setCountry(country);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (ISOCode) {
      fetchCountryInfo(ISOCode);
    }
  }, [ISOCode]);

  return (
    <div className={styles.popupContainer}>
      {isLoading && <LoaderSpinner />}

      {!country && !isLoading && <p>Country not found</p>}

      {country && (
        <>
          <h2>{`${country.emoji} ${country.name}`}</h2>
          <ul className={styles.list}>
            <li>
              <span>Continent: </span>
              {country.continent?.name}
            </li>
            <li>
              <span>Capital:</span> {country.capital}
            </li>
            <li>
              <span> Currency:</span> {country.currency}
            </li>
            <li>
              <span>Phone:</span> +{country.phone}
            </li>
            <li>
              <span>Aws region:</span> {country.awsRegion}
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default MapPopup;
