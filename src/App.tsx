import { useCallback, useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import './App.scss';
import Home from './components/pages/Home/Home';
import { getVaccineData } from "./services/vaccineTrackerService";

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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home data={data} />}>
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
