import axios from 'axios';
import { mapByContinentAndLocation } from '../helpers/map-vaccine-data';

export const getVaccineData = async () => {
  const response = await axios.get('api/data/owid-covid-data.json');

  return mapByContinentAndLocation(response.data);
};
