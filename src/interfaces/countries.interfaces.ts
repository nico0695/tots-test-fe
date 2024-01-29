export interface ICountryJSON {
  Country: string;
  'ISO Code': string;
  Latitude: number;
  Longitude: number;
}

export interface ICountry {
  name: string;
  awsRegion: string;
  continent: {
    name: string;
  };
  capital: string;
  currency: string;
  emoji: string;
  emojiU: string;
  phone: string;
}
