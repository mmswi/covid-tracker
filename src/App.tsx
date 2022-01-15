import {
  useCallback, useEffect, useState, createContext,
} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import './App.scss';
import Home from './components/pages/Home/Home';
import { getVaccineData } from './services/vaccineTrackerService';

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
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div>
  );
}

export const DataContext = createContext(null);
export default App;
