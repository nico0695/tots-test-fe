import { ICountry, ICountryJSON } from '@/interfaces/countries.interfaces';
import { GraphQLClient, gql } from 'graphql-request';

// GraphQL API URL
const graphQLUrl = 'https://countries.trevorblades.com/';

/**
 * Returns a list of countries
 * @returns ICountryJSON[]
 */
export const getCountriesList = (): ICountryJSON[] => {
  return [
    {
      Country: 'United States',
      'ISO Code': 'US',
      Latitude: 37.0902,
      Longitude: -95.5022,
    },
    {
      Country: 'Canada',
      'ISO Code': 'CA',
      Latitude: 53.0,
      Longitude: -123.0,
    },
    {
      Country: 'Mexico',
      'ISO Code': 'MX',
      Latitude: 23.0,
      Longitude: -102.0,
    },
    {
      Country: 'Brazil',
      'ISO Code': 'BR',
      Latitude: -23.0,
      Longitude: -55.0,
    },
    {
      Country: 'Argentina',
      'ISO Code': 'AR',
      Latitude: -32.0,
      Longitude: -68.0,
    },
    {
      Country: 'Chile',
      'ISO Code': 'CL',
      Latitude: -33.0,
      Longitude: -70.0,
    },
    {
      Country: 'Colombia',
      'ISO Code': 'CO',
      Latitude: 10.0,
      Longitude: -72.0,
    },
    {
      Country: 'Peru',
      'ISO Code': 'PE',
      Latitude: -12.0,
      Longitude: -77.0,
    },
    {
      Country: 'Ecuador',
      'ISO Code': 'EC',
      Latitude: -1.0,
      Longitude: -79.0,
    },
    {
      Country: 'Venezuela',
      'ISO Code': 'VE',
      Latitude: 7.0,
      Longitude: -66.0,
    },
    {
      Country: 'Guyana',
      'ISO Code': 'GY',
      Latitude: 6.0,
      Longitude: -58.0,
    },
    {
      Country: 'Suriname',
      'ISO Code': 'SR',
      Latitude: 6.0,
      Longitude: -55.0,
    },
    {
      Country: 'French Guiana',
      'ISO Code': 'GF',
      Latitude: 4.0,
      Longitude: -53.0,
    },
  ];
};

// GraphQL query to get country by ISO code
const countryQuery = gql`
  query ($code: ID!) {
    country(code: $code) {
      name
      awsRegion
      continent {
        name
      }
      capital
      currency
      emoji
      emojiU
      phone
    }
  }
`;

/**
 * Get country by ISO code from GraphQL API
 * @param code ISO code
 * @returns ICountry | null
 */
export const getCountryByCode = async (
  code: string
): Promise<ICountry | null> => {
  try {
    const graphQLClient = new GraphQLClient(graphQLUrl);

    const response = await graphQLClient.request<{ country: ICountry }>(
      countryQuery,
      {
        code,
      }
    );
    return response.country;
  } catch (error) {
    return null;
  }
};
