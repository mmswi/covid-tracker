import _ from 'lodash';
import PropTypes from 'prop-types';
import { CURRENT_DATE } from '../../../dictionary/vaccineDataDictionary';
import DateTooltip from '../DateTooltip/DateTooltip';
import './ContinentTable.scss';

const ContinentTable = (props: any) => {
  const {continentName, setSortBy, currentDate, continentCountriesData} = props;
  const getTimeStamps = (country: any = {}) => country.time_stamps || {};

  return <div>
            <div>{continentName}</div>
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Ppl. fully vaccinated</th>
                        <th><button onClick={() => {setSortBy(continentName, 'people_vaccinated_per_hundred')}}>Full vaccination %</button></th>
                        <th>Ppl. vaccinated</th>
                        <th>Ppl vaccination %</th>
                        <th>New Cases</th>
                        <th>New Deaths</th>
                        <th><button onClick={() => {setSortBy(continentName, 'icu_patients')}}>ICU Patients</button></th>
                        <th><button onClick={() => {setSortBy(continentName, 'icu_patients_per_million')}}>ICU Patients / mil</button></th>
                        <th><button onClick={() => {setSortBy(continentName, 'icuPatientsPerFullyVaccinatedPerHundred')}}>ICU Patients / fully vaccinated %</button></th>
                        <th>Population</th>
                        <th>Cardio death rate</th>
                        <th>Beds / thousand</th>
                        <th>Pop. density</th>
                        <th>Human dev. index</th>
                        <th>Life expectancy</th>
                        <th>GDPR/capita</th>
                        <th>65 or older</th>
                        <th>70 or older</th>
                        <th>Extreme poverty</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        _.map(continentCountriesData, (country, index) => {
                            const timeStamps = getTimeStamps(country);

                            return <tr key={country.name + index}>
                                <td>{country.name}</td>
                                <td>
                                    {country.people_fully_vaccinated}
                                    <DateTooltip isTooltipVisible={currentDate === CURRENT_DATE} timeStamp={timeStamps['people_fully_vaccinated']}></DateTooltip>
                                </td>
                                <td>
                                    {country.people_fully_vaccinated_per_hundred}
                                    <DateTooltip isTooltipVisible={currentDate === CURRENT_DATE} timeStamp={timeStamps['people_fully_vaccinated_per_hundred']}></DateTooltip>
                                </td>
                                <td>{country.people_vaccinated}</td>
                                <td>{country.people_vaccinated_per_hundred}</td>
                                <td>{country.new_cases}</td>
                                <td>{country.new_deaths}</td>
                                <td>{country.icu_patients}</td>
                                <td>{country.icu_patients_per_million}</td>
                                <td>{country.icuPatientsPerFullyVaccinatedPerHundred}</td>
                                <td>{country.population}</td>
                                <td>{country.cardiovasc_death_rate}</td>
                                <td>{country.hospital_beds_per_thousand}</td>
                                <td>{country.population_density}</td>
                                <td>{country.human_development_index}</td>
                                <td>{country.life_expectancy}</td>
                                <td>{country.gdp_per_capita}</td>
                                <td>{country.aged_65_older}</td>
                                <td>{country.aged_70_older}</td>
                                <td>{country.extreme_poverty}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
          </div>
};

ContinentTable.propTypes = {
  setSortBy: PropTypes.func,
  continentKey: PropTypes.string,
  continentName: PropTypes.string,
  currentDate: PropTypes.string,
  continentCountriesData: PropTypes.array
}

export default ContinentTable;
