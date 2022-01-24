import {
  useCallback, useEffect, useState, createContext,
} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './helpers/axios-config';
import './App.scss';
import Country from './components/pages/Country/Country';
import Home from './components/pages/Home/Home';
import { getVaccineData } from './services/vaccineTrackerService';
import ScrollToTop from './components/shared/ScrollToTop/ScrollToTop';

function App() {
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    try {
      const response = await getVaccineData();
      setData(response);
      console.log('got response', response);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="App">
      <DataContext.Provider value={data}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/name/:continent/:country" element={<Country />} />
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
}

export const DataContext = createContext(null);
export default App;
